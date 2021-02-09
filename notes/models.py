from django.db import models


class Notes(models.Model):
    sender =  models.ForeignKey(
        'jwt_auth.User',
        related_name='sent_notes',
        on_delete=models.CASCADE)

    connection =  models.ForeignKey(
        'connections.ConnectionS',
        related_name='notes',
        on_delete=models.CASCADE)

    notes = models.CharField(max_length=5000)
    color = models.CharField(max_length=10)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

