export const typeList = [  
  'Amusement park'
  ,'Aquarium'
  ,'Art gallery'
  ,'Bakery'
  ,'Bank'
  ,'Bar'
  ,'Beauty salon'
  ,'Bicycle store'
  ,'Book store'
  ,'Bowling alley'
  ,'bus station'
  ,'Cafe'
  ,'Campground'
  ,'Car rental'
  ,'Casino'
  ,'Clothing store'
  ,'Electronics store'
  ,'Florist'
  ,'Furniture store'
  ,'Gym'
  ,'Home goods store'
  ,'Library'
  ,'Liquor store'
  ,'Lodging'
  ,'Movie rental'
  ,'Movie theater'
  ,'Museum'
  ,'Night club'
  ,'Park'
  ,'Pet store'
  ,'Restaurant'
  ,'Rv park'
  ,'Shoe store'
  ,'Shopping mall'
  ,'Spa'
  ,'Stadium'
  ,'Subway station'
  ,'Supermarket'
  ,'Tourist attraction'
  ,'Travel agency'
  ,'Zoo'
]


export const getCoordinates = () => {

  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  }
  )
}