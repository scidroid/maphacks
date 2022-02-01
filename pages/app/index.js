import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const HomeApp = ({ google, markers }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({});
  const [addPlace, setAddPlace] = useState({});
  const [isMonetized, setIsMonetized] = useState(true);
  const [counter, setCounter] = useState(0);
  const [currentPosition, setCurrentPosition] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    console.log(currentPosition);
  }, [isMonetized, currentPosition]);
  const onMarkerClick = (props, marker, e) => {
    setShowInfo(true);
    setSelectedPlace(props);
  };
  const onClose = () => {
    if (showInfo) {
      setShowInfo(false);
    }
  };
  const handleClick = (e) => {
    if (isMonetized) {
      const data = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setAddPlace(data);
    }
  };
  const InfoContent = ({ message, position, image, place, id, nedeed }) => {
    console.log(message, position, image, place);
    if (message == "Add this place") {
      return (
        <div>
          <Link href={"/app/add/" + position.lat + "/" + position.lng}>
            <a className="text-black underline hover:no-underline text-xl font-bold">
              Add this place
            </a>
          </Link>
        </div>
      );
    } else {
      console.log(message);
      return (
        <div className={"flex flex-col items-center justify-center"}>
          <img src={image} alt={message} width="200px" />
          <h1 className="font-bold text-center">{message}</h1>
          <h2 className="font-bold text-center">{"Needs: $" + nedeed}</h2>
          <h2 className="text-center">{place}</h2>
          <Link href={"/app/cause/" + id}>
            <a className="text-center text-blue-400 font-bold underline">
              Contribute with this cause
            </a>
          </Link>
        </div>
      );
    }
  };
  if (isMonetized && counter < 1) {
    setCounter(counter + 1);
    toast.success(
      "Click anywhere in the map to add causes :0",
      {
        duration: 6000,
      }
    );
  }
  return (
    <div className="">
      {currentPosition && (
        <>
          <Map
            google={google}
            zoom={10}
            onClick={(a, b, c) => handleClick(c)}
            style={mapStyles}
            center={currentPosition}
          >
            {addPlace && (
              <Marker
                name={"Add this place"}
                onClick={onMarkerClick}
                title={"Add place"}
                position={addPlace}
              />
            )}
            {markers.map((n) => (
              <Marker
                key={n.key}
                id={n.key}
                position={{ lat: n.lat, lng: n.lng }}
                name={n.name}
                image={n.image}
                place={n.place}
                nedeed={n.nedeed}
                onClick={onMarkerClick}
              />
            ))}
            <InfoWindow
              position={selectedPlace.position}
              visible={showInfo}
              onClose={onClose}
            >
              <InfoContent
                message={selectedPlace.name}
                position={selectedPlace.position}
                image={selectedPlace.image}
                place={selectedPlace.place}
                id={selectedPlace.id}
                nedeed={selectedPlace.nedeed}
              />
            </InfoWindow>
          </Map>
          <Toaster />
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(process.env.AUTH0_BASE_URL + "/api/data");
  const markers = await res.json();

  return {
    props: {
      markers,
    },
  };
};

const Loader = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDX5b2eROUXhaHcVDNiX4yAnipp3d7898Q",
  LoadingContainer: Loader,
})(HomeApp);
