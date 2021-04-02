<h1> MATCH US </h1>
<p> Link: https://match-uss.herokuapp.com/login</p>

<h2> Overview </h2>
<p> A website design for daters to better keep track of their upcoming dates and be matched with new dates ideas. Takes the same ideas as tinder and similar apps where in user either swipe yes or no to certain topics and will be only be shown results when both swipe yes. Users will be able to choose from a range of activities, restaurants and movie options to swipe from. With these matches users can use the randomiser section to come up with date plans, or be shown completely random date plans unrelated to their current matches. Also has calendar, wishlist, love notes and location sections. 
  
<h2> Tehcnologies </h2>
<ul> 
<li><p> JavaScript </p></li>
<li><p> Sass </p></li>
<li><p> ReactJs </p></li>
<li><p> Python </p></li>
<li><p> Django </p></li>
<li><p> postgreSQL </p></li>
<li><p> Heroku </p></li>
</ul>

<h2> Process </h2>
<h4> Connections </h4> 
<p> Each profile will be able to makes multiple connections, all with each section of the dating website. I initially planned create one generic swiping section for each user then compare each of their individual swipes for matches, however instead opted to create separate connections so users can swipe multiple times to the same places depending on if they may want to do some activities with some but not with others.</p>

```
class Connections(models.Model):

    participants = models.ManyToManyField(User, related_name='connections')
    created_at = models.DateTimeField(auto_now_add=True)
    request = models.IntegerField( blank=True, null=True)
```

<h4> Matching and randomiser </h4> 
<p> I decided to use the google places API to find results for the restaurants and activities matching as it provided a lot of 'types' already stored and I could simply present this as an array for the user to choose from instead of manually finding activities that would provide search results. The movies information is provided using the TMdb API. These requests are made in the backend and in a shared get function. In the front end, all model specific details are contained within their own section components as working with two different APIs would result in different return responses, relevant details are then passed as props into a main match component that holds all the shared functions for swiping, check for matches and deleting matches. </p>
  
 <p> Once the user makes a choice between yes or no, the name and direction of the swipe are sent through a post request and created in their own models. The matches are presented on a different component and found by filtering for only yes direction results, it was important to also store the no direction swipes to ensure the user is only shown results they have not swiped on before. </p>
  
 <p>I added a restart option which would clear all the swipes made by the user's ID in that particular connection, their swipes for the same places in other connections would still remain. I also added filter options which would filter movies by genre, altering the request URL for TMdb and filter Google places results for keyword and locations specification, sending these as parameters in the backend requests. </p>


```
swipe = async (d) => {
  try {
    const data = this.props.swipeData(d, 0)
    const r = (await  axios.post(`/api/${this.props.section}/`, data, headers())).data
    await d === 'True' ? this.checkMatch(r.f_id) : this.props.nextSwipe()
  } catch (err) {
    err.response.status === 422 ? this.props.nextSwipe() : null
  }
}
```

<p> The randomiser creates date plans for users by generating random numbers and taking this index result from their match results or from the request results. Random numbers are also used to choose between the daters to decide who pays for the date. </p>

```
class ActivitiesRandomView(APIView):
    def post(self,request):
        if not request.data['random']:
            id_list= activities.objects.filter(Q(user=request.user.id) & Q(direction=True) & Q(connection=request.data['connection'])).values_list('f_id', flat = True)
            matches = activities.objects.filter(Q(user=request.data['partner']) & Q(direction=True) & Q(connection=request.data['connection']) & Q(f_id__in=id_list)).values_list('f_id', flat = True)
            if len(matches) == 0:
                return Response({ 'message': 'No matches, swipe to add more!'})
            choice = matches[random.randint(0,len(matches) - 1)]
            req = requests.get(gDetails, params={'place_id': choice}).json()
        else :
            r = requests.get(nearby,params=request.data).json()
            choice = r['results'][random.randint(0,len(r['results']) - 1)]
            req = requests.get(gDetails, params={'place_id': choice['place_id']}).json()
        return Response(req['result'], HTTP_200_OK)
 ```
 
 <h4> Locations </h4> 
 <p> Date locations are presented on a map created using mapbox. I connected the list view and icons on the map using refs and classes that change the style of selected locations. 
  
  ```
  setSelect = (i) => {
  this.setState({ selected: i, center: this.state.locations[i] })
  this.list.scrollTop = this.listLocations[i].offsetTop - 200 
}
  ```
<h4> Calendar and events </h4>
<p> The calendar is made using a grid system that pushes in the correct number of cells and dates provided by moment. Events are created using a form and displayed on the calendar as either pending response, accepted or for the user to answer themselves. The events model has an initial value of false in a boolean request field, this will be changed to true through a patch request if the user chooses to accept the invite or a delete request will be sent if the user decides to decline. The create a date form is used throughout the website and is made reusable by setting props as state in the componentDidMount function, allowing certain sections to be preloaded into the form depending on the sections, e.g., dates from calendar or addresses from swipe matches.
![image](https://user-images.githubusercontent.com/61989539/113461798-080a0d80-9416-11eb-91ab-861cb14aed98.png)

  
  ```
  const accept = async () => {
    const data = { ...req, connection: req.connection.id, request: 'False' }
    await axios.put(`/api/events/${req.id}/`, data)
  }
  
  const decline = async () => {
    await axios.delete(`/api/events/${req.id}/`)
  }

```
  
  ```
  <button  className='button' onClick={()=>{
     setData({ location: r.formatted_address }}}> 
      <p> + Create Date </p>
   </button> 
  
  componentDidMount() {
  this.setState({ data: 
    { ...this.state.data,
      ...this.props.data, 
      connection: this.props.connection ? this.props.connection.id : null } 
  })
}
  ```
 
<h2> Wins/Blockers </h2>
<h4> Wins </h4>
<ul>
  <li><p> I found this project had a lot of connected sections that worked with each other to supply the user with data, while i usually struggle sorting through these types interactions in a way that ensures all sides remain functional, I was able to better premeditate what issue may arise and plan ahead so avoid these in my planning.
    </p></li>
      <li><p>
My understanding of Django improved a lot in this project due to having to be much more specific in my results when working with different sections. I feel like I spent a lot of time searching through documentation and finding new ways to alter querysets and as a result I also gained a lot more practice in Python too. 
 </p></li>
  </ul>
  
  <h4> Blockers </h4>
  <ul>
  <li><p>
    Working with different API responses proved to be difficult at times when trying to create reusable components, such as in details pages, or functions that required specific information to each. This was solved using a lot of if else statements but in some instances may have been better to just have written out again separately for each. 
    </p></li>
    <li><p>
    Creating the homepage was quite difficult as it takes in such a wide range of data and creating backend requests that could provide this in a way that wasn’t sending irrelevant data or bloat was a little tricky. 
    </p></li>
  </ul>
  
  </ul>

<h2> Bugs and future work </h2>
<ul>
  <li><p>
    <p> The wishlist takes quite some time to come up with results as I decided to pull separate requests for each item that gets added to the users list. I added a loading spinner to ensure the user knows to wait for results and the website is still functioning but it could possibly be worth looking for alternative methods or APIs to solve this issue. 
  </ul>

<h2> Experience and key takeaways </h2>
<p> Match us was a fun project for me and gave me a lot of opportunity to polish my skills in react and Django. I feel it’s helped me be more conscious of my organisation and has made me much more comfortable with solo work. While usually I find it difficult to wrap up the smaller details of a project, I've learnt to do these tasks as soon as they appear instead of putting them off till the end and overall, I'm pleased with the outcome of this project.

