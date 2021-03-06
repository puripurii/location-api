// import * as React from "react";
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import VectorLayer from 'ol/layer/Vector';
// import { Vector } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import {defaults as defaultInteractions, DragRotateAndZoom} from 'ol/interaction';
// import * as actions from '../actions'

// import MapOverlay from './MapOverlay'
// interface Props {
//   defaultCenter: any
//   zoom:          number
// };

// interface State {
//   center:      number[]
//   zoom:        number
//   showOverlay: boolean
//   overlayPos:  number[]
//   focus:       number[]
//   width:       number
//   height:      number
// };

// export default class Location extends React.Component<Props, State> {
//   static defaultProps: Props = {
//     defaultCenter: [0,0],
//     zoom: 13
//   }

//   state: State = {
//     center: null,
//     zoom: this.props.zoom,
//     showOverlay: false,
//     overlayPos: null,
//     focus: this.getCenter(this.props.defaultCenter),
//     width: 700,
//     height: 500
//   }

//   map: Map;
//   points: any[] = [];

//   getCenter(lonLat) {
//     return fromLonLat(lonLat)
//   }

//   handlePointElements() {
//     let points = this.points

//     points.map( point => {

//     })
//   }

//   componentDidUpdate(previousProps, previousState) {
//     if (previousProps !== this.props)
//         this.setState({
//           focus: this.getCenter(this.props.defaultCenter),
//           zoom: this.props.zoom,
//         })
//     this.initiateOpenLayers()
//   }

//   initiateOpenLayers() {
//     this.resetMap();
//     const { center, zoom, focus } = this.state;

//     let streetLayer = new TileLayer({
//       source: new OSM()
//     })

//     let point = new actions.Point({
//       center: true,
//       defaultCenter: focus,
//       icon: 'User'
//     }) || null

//     let vectorsAndIcons = new VectorLayer({
//       source: new Vector({
//         features: [
//           ...this.props.points
//         ]
//       })
//     })

//     this.map = new Map({
//       target: 'l-api-map',
//       interactions: defaultInteractions().extend([
//         new DragRotateAndZoom()
//       ]),
//       layers: [
//         streetLayer,
//         vectorsAndIcons
//       ],
//       view: new View({
//         center: center || focus,
//         zoom: zoom
//       })
//     });

//     this.map.on('singleclick', this.handleMapClick.bind(this))
//   }

//   handleMapClick(e) {
//     let coord = e.coordinate;
//     let iconFeatureA = this.map.getFeaturesAtPixel(e.pixel);
//     const { width, height } = this.state
//     console.log(e)

//     this.handleOverlayClose();
//     this.setState({
//       showOverlay: true,
//       overlayPos:  [width/2 + 100, height - (height - 30)],
//       focus: coord
//     })
//   }

//   handleOverlayClose() {
//     this.setState({
//       showOverlay: false
//     })
//   }

//   resetMap() {
//     document.getElementById('l-api-map').innerHTML = ""
//   }

//   mapStyles() {

//     return {
//       height: this.state.height,
//       width: this.state.width
//     }
//   }

//   render() {
//     return(
//       <React.Fragment>
//         <div id="l-api-map" className="l-api-map" style={this.mapStyles()}>
//         </div>
//         {/* <MapOverlay content="asdasd" hidden={!this.state.showOverlay} position={this.state.overlayPos} handleClose={this.handleOverlayClose.bind(this)}></MapOverlay> */}
//       </React.Fragment>
//     )
//   }
// }
