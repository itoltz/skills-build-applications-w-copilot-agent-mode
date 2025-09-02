from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Create users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team='marvel')
        batman = User.objects.create(email='batman@dc.com', name='Batman', team='dc')
        wonderwoman = User.objects.create(email='wonderwoman@dc.com', name='Wonder Woman', team='dc')
        spiderman = User.objects.create(email='spiderman@marvel.com', name='Spider-Man', team='marvel')

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30, date='2025-09-01')
        Activity.objects.create(user=batman, type='cycle', duration=45, date='2025-09-01')
        Activity.objects.create(user=wonderwoman, type='swim', duration=60, date='2025-09-01')
        Activity.objects.create(user=spiderman, type='climb', duration=20, date='2025-09-01')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Upper body strength', difficulty='Easy')
        Workout.objects.create(name='Sprints', description='Speed training', difficulty='Medium')
        Workout.objects.create(name='Deadlift', description='Strength training', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
