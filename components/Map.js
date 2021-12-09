import { getCenter } from 'geolib';
import React, {useState} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'

function Map({searchResults}) {

    const [selectedLocation, setselectedLocation] = useState({})

    // Transform the search results object into {latitude: 52, longitude: 13}

    const coordinates = searchResults.map((result) => (
        {
            longitude: result.long,
            latitude: result.lat
        }
    ));

    // get the center of all the coordinates
    const center = getCenter(coordinates);


    // setting our viewport
    const [viewport, setviewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 12,
        width: '100%',
        height: '100%'
    });


    return (
        <ReactMapGL 
            {...viewport}
            mapStyle='mapbox://styles/leog04/ckwyhma920axm15pj8q40oljr'
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(viewport) => setviewport(viewport)}
            >
            {
                searchResults.map(result => (
                    <div key={result.long}>
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >

                            <p aria-label='push-pin' onClick={() => setselectedLocation(result)} className='cursor-pointer text-2xl animate-bounce'>
                                🏠
                            </p>
                        
                        </Marker>
                        {/* Popup that show if we click on mark */}
                        {
                            selectedLocation.long === result.long && (
                                <Popup onClose={() => setselectedLocation({})} closeOnClick={true} latitude={result.lat} longitude={result.long}>
                                    {result.title}
                                </Popup>
                            )
                        }
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map
