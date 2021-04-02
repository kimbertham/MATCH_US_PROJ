<h1> MATCH US </h1>
<p> Link </p>

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
<p> Each profile will be able to makes multiple connections, all with each section of the dating website. I intially planned create one generic swiping section for each user then compare each of their individual swipes for matches, however instead opted to create separate connections so users can swipe multiple times to the same places depending on if they may want to do some activities with some but not with others. </p>

<h4> Matching and randomiser </h4> 
<p> I decided to use the google places api to find results for the restaurants and activities matching as it provided a lot of 'types' already stored and I could simply present this as an array for the user to choose from instead of manually finding activities that would provide search results. The movies information is provided using the TMdb api. These requests are mad in the backend and in a shared get function that sends the information to the frontend. Once the user makes a choice between yes or no, the name of the swipe to seperate models along with the direction of the swipe. The matches are presented on a different component and found by filtering for only yes direction results. It was important to also store the no direction results to ensure when the user returns to the page they are only shown results they have no yet swipe on yet. I added a restart option which woud clear all the swipes made by the users id in that particular connection, so their swipes for the same places in other connectison still remain.  I also added filter options which would filter movies by genre, altering the request url for TMdb. The filter option for the goole places results allow for key world and locations specification and sends these as parameters in the requests. In the fron end, all model specific details are contained within their own section compenents that are then passed as props into a main match component that holds all the shared functions needed to swipe and check for matvches.</p>

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

<p> The randomiser creates date plans for users by generating random numbers and choosing from their match results or from the request results. Random numbers are also used to choose between the daters to decide who pays for the date. </p>

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
<h4> Calendar </h4>

