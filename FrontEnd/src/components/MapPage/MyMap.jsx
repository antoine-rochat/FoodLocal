import React from 'react';
import L from 'leaflet';
import {
  Map, TileLayer, Marker, Popup, CircleMarker,
} from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import ListItemProducer from './ListItemProducer';
import MarkerCarotte from '../../img/MarkerCarotte.png';


const Products = require('../../Datas/Products.json');

const styles = {
  map: {
    backgroundColor: '#CCCCCC',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: 'calc(100vh - 114px)',
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '100%',
    borderBottom: '1px solid grey',
  },
  media: {
    height: 80,
    width: 80,
  },
  media2: {
    height: 80,
    width: 80,
    backgroundColor: '#66CCCC',
  },
};
const myIcon = L.icon({
  iconUrl: MarkerCarotte,
  iconSize: [40, 40],
  iconAnchor: [20, 37],
  PopupAnchor: [-20, -20],
});

function has(items, product) {
  let hasItem = false;
  items.forEach((item) => {
    if (item === product) {
      hasItem = true;
    }
  });
  return hasItem;
}


class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      openFiltres: false,
      value: Products.products[0].items,

      location: {
        // par défaut, position de Lausanne
        latitude: 46.5333,
        longitude: 6.6667,
      },
      zoom: 8, // on zoom sur la location de l'utilisateur
      salespoints: [],
      userHasALocation: false, // indique si l'utilisateur a accepté de donner sa position
    };
  }

  componentDidMount() {

    this.setState({
      location: {
        // par défaut, position de Lausanne
        latitude: 46.533,
        longitude: 6.667,
      },
      zoom: 10, // on zoom sur la location de l'utilisateur
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        zoom: 12, // on zoom sur la location de l'utilisateur
        userHasALocation: true,
      });
    });
  }


  // ouvre le pop-up pour les filtres
  handleClickOpenFilters = () => {
    this.setState({ openFiltres: true });
  };

  // ferme le pop-up des filtres
  handleClose = () => {
    this.setState({ openFiltres: false });
  };

  addItem = newItem => () => {
    console.log(this.state.items);
    const { items } = this.state;
    this.setState({
      items: [...items, newItem]
    });
  }

  // supprime un produit du tableau des produits
  removeItem = itemToDelete => () => {
    const { items } = this.state;
    const newItems = items.filter(item => item !== itemToDelete);

    this.setState({
      items: [...newItems]
    });
  }

  loadProducer() {
    return (
      this.props.data.producers.map(tile => (
        <Marker key={tile._id} position={[tile.address.latitude, tile.address.longitude]} icon={myIcon}>
          <Popup key={tile._id} position={[tile.address.latitude, tile.address.longitude]} closeButton={false}>
            <ListItemProducer salepoint={tile} />
          </Popup>
        </Marker>
      ))
    );
  }

  render() {
    const { location, zoom, userHasALocation } = this.state;
    const { latitude, longitude } = location;
    const { classes } = this.props;
    const { fullScreen } = this.props;

    return (

      <div className={classes.map}>
        <div className={classes.filterBar}>
          <Button onClick={this.handleClickOpenFilters} variant="outlined" size="small" className={classes.margin}>
            {'Produits'}
          </Button>

          <Button variant="outlined" size="small" className={classes.margin} >
            Filtres
          </Button>
          <TextField
            id="outlined-with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Dialog
            fullScreen={fullScreen}
            fullWidth
            maxWidth={false}
            open={this.state.openFiltres}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"Séléctionnez les produits que vous cherchez"}</DialogTitle>
            <DialogContent>
              <div className={classes.root}>
                <Grid container spacing={24}>
                  {Products.products.map(product => (
                    <Grid item xs={4} sm={2} key={product.name}>
                      <div className={classes.paper}>
                        <Card className={classes.media} style={{ margin: '0 auto' }}>
                          <CardActionArea onClick={() => { this.setState({ value: product.items }); }}>
                            {this.state.value === product.items
                              ? (
                                <CardMedia className={classes.media2} image={MarkerCarotte} title={product.name} />
                              ) : (
                                <CardMedia className={classes.media} image={MarkerCarotte} title={product.name} />
                              )}
                          </CardActionArea>
                        </Card>

                        <div className={classes.paper}>
                          <Typography className={classes.typo} variant="body1" gutterBottom>
                            {product.name}
                          </Typography>
                        </div>
                      </div>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Divider variant="middle" />
                  </Grid>
                  {this.state.value !== undefined && this.state.value.map(product => (
                    <Grid item xs={4} sm={2}>

                      <Card className={classes.media} style={{ margin: '0 auto' }}>

                        {has(this.state.items, product) ? (
                          <CardActionArea onClick={this.removeItem(product)}>

                            <CardMedia className={classes.media2} image={MarkerCarotte} title={product} />
                          </CardActionArea>

                        ) : (
                            <CardActionArea onClick={this.addItem(product)}>
                              <CardMedia className={classes.media} image={MarkerCarotte} title={product} />
                            </CardActionArea>
                          )
                        }

                      </Card>
                      <div className={classes.paper}>
                        <Typography className={classes.typo} variant="body1" gutterBottom> {product} </Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={this.handleClose} color="primary" autoFocus>
                {'Voir les producteurs'}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Map key="map" className={classes.map} center={[latitude, longitude]} zoom={zoom} ref={(c) => { this.map = c; }}>

          <TileLayer
            key="tileLayer"
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://maps.tilehosting.com/styles/streets/{z}/{x}/{y}.png?key=YrAASUxwnBPU963DZEig"
          />

          {
            // si l'utilisateur a accepté de donner sa location, l'affiche sur la carte
            userHasALocation
            && (
              <CircleMarker key="userPosition" center={[this.state.location.latitude, longitude]} />
            )
          }
        </Map>
      </div>
    );
  }
}

export default withStyles(styles)(withMobileDialog()(MyMap));
