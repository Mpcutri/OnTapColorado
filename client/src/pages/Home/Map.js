const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3o7dy50LdekZi5WmxFMHbVK690D3KeKQ&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `95%` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `95%` }} />
  }),   
  withHandlers({
    onMarkerClick: () => (marker) => {
      console.log(marker.id)
      console.log('Go to the marker post page')
      window.location = '/breweries/' + marker._id;
    },
    showInfo: () => (marker) => {
      $("#infoBox").show()
      $("#infoText").text(marker.title)
    },
    hideInfo: () => (marker) => {
      $("#infoBox").hide()
      $("#infoText").text("")
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13} defaultCenter={{ lat: 39.7393, lng: -104.9848 }} style={{ position: "relative" }}>
    <div id="infoBox" style={{ backgroundColor: "white", color: "black", padding: `12px`, position: "absolute", left: "60%", bottom: "-30%" }}>
      <p id="infoText"></p>
    </div>

    {props.isMarkerShown && (
      <div>
        
        {markers.map(brewery => (
        <div>
        <Marker
          onClick={props.onMarkerClick.bind(this, brewery)}
          onMouseOver={props.showInfo.bind(this, brewery)}
          onMouseOut={props.hideInfo.bind(this, brewery)}
          key={brewery.id}
          className={brewery.id}
          position={brewery.position}
        >

      </Marker>
      </div>
      ))}

      </div>
      
      

    )}
  </GoogleMap>
));