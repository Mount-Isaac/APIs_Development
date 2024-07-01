from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


# whenever a user deletes their account and they 
# have Posts associated with them, transfer the 
# ownership to the admin
# admin_user = User.objects.get(username='admin')

class Customer(models.Model):
    '''
        EXPECTED JSON OBJECT FORMAT
        {
            "email": "isaackyalo@mail.co.ke",
            "first_name": "isaac",
            "last_name": "kyalo",
            "phone_number": "255982018924",
            "password": "#8sj92980uojksf"
        }
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='customer')
    email = models.EmailField(max_length=80, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    image = CloudinaryField(
        'image', 
        null=True, 
        blank=True, 
        default='https://res.cloudinary.com/dkzk3c8rt/image/upload/v1719169562/APIs_customers/ja0cm5vzpjjzkzfhkpcs.png'
    )
    following= models.ManyToManyField('self', symmetrical=False, related_name='followers')
    '''
        self, means the relationship is to the same model (Customer).
        symmetrical=False, means if A follows B, B doesn't automatically follow A.
        related_name='followedby',  creates a reverse relation. For any Tweep, 
        you can access their followers with tweep.followers.all() and those they 
        follow with tweep.followedby.all().
    '''

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


    def follow(self, profile_to_follow):
        if profile_to_follow != self:
            self.following.add(profile_to_follow)
    
    def unfollow(self, profile_to_unfollow):
        self.following.remove(profile_to_unfollow)
    
    def is_following(self, profile):
        return self.following.filter(pk=profile.pk).exists()


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=50)
    content = models.TextField(blank=False, null=False)
    liked = models.BooleanField(default=False)
    disliked = models.BooleanField(default=False)
    likes = models.ManyToManyField(User, related_name='liked_by', blank=True)
    dislikes = models.ManyToManyField(User, related_name='disliked_by', blank=True)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    # add cloudinary image upload

    def __str__(self):
        # customer = Customer.objects.get(user=self.author)
        return f"{self.title.capitalize()}"
        #   by {customer.first_name} {customer.last_name}"
    
    def like(self, customer):
        if not self.likes.filter(id=customer.id).exists():
            self.likes.add(customer)
    
    def unlike(self, customer):
        if self.likes.filter(id=customer.id).exists():
            self.likes.remove(customer)
    
    def is_liked_by(self, customer):
        return self.likes.filter(id=customer.id).exists()
    
    @property
    def total_likes(self):
        return self.likes.count()
    
    @property
    def total_dislikes(self):
        return self.dislikes.count()

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(blank=False, null=False, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.post.title} {self.user.email}'
