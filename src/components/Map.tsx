import * as React from "react";
import * as actions from '../actions';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import Utils from '../utils'


import '../css/ol.css';
import '../css/geol.css';

interface Props {
  zoom?: string
  children: React.ReactNode
}

class Map extends React.Component<Props> {

  map: ol.Map;
  points: any[] = [];
  zoom: string = this.props.zoom || "13";
  currentLocation: any[] = [0, 0];
  geolocation: ol.Geolocation;
  view: any = new ol.View({
    center: [0, 0],
    zoom: this.zoom
  });

  componentDidMount() {
    this.initiateMap()
    this.getGeolocation()
  }

  getGeolocation() {
    this.geolocation = new ol.Geolocation({
      trackingOptions: {
        enableHighAccuracy: true
      },
      tracking: true,
      projection: this.view.getProjection()
    });

    this.geolocation.once('change', (evt) => {
      let coords = this.geolocation.getPosition();
      let center = this.view.getCenter()

      if (JSON.stringify(center) == JSON.stringify([0, 0])) {
        this.view.setCenter(coords)
      }
      this.initiateMap()
    })

    this.geolocation.on('change:position', (evt) => {
      // for tracking
    })

  }

  initiateMap() {
    this.resetMap();
    this.parseChildren();

    let streetLayer = new TileLayer({
      source: new OSM()
    })

    let vectorsAndIcons = new VectorLayer({
      source: new Vector({
        features: [
          ...this.points
        ]
      })
    })

    this.map = new ol.Map({
      target: 'l-react-map',
      interactions: defaultInteractions().extend([
        new DragRotateAndZoom()
      ]),
      layers: [
        streetLayer,
        vectorsAndIcons
      ],
      view: this.view
    });
  }

  resetMap() {
    document.getElementById('l-react-map').innerHTML = ""
  }

  parseChildren() {
    // Todo: Transfer this to utils
    if (!this.props.children) return
    let children: any = Utils.findAllChild(this.props.children)
    let parsedPoints = new actions.Point({ points: children.points, currentLocation: this.view.getCenter() })
    this.view.setCenter(parsedPoints.center)
    this.points = parsedPoints.points
  }

  render() {
    return <div id="l-react-map"></div>
  }
}

export default Map;