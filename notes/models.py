from django.db import models


class Notes(models.Model):
    reciever =  models.ForeignKey(
        'jwt_auth.User',
        related_name='recieved_notes',
        on_delete=models.CASCADE)
    

    connection =  models.ForeignKey(
        'connections.ConnectionS',
        related_name='notes',
        on_delete=models.CASCADE)
    
    notes = models.CharField(max_length=5000)
    color = models.CharField(max_length=10)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

