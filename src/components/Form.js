import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from 'react-google-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
        flexGrow: 1,
    },
}));

export default function  Form() {
    const classes = useStyles();
    return(
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
            <Autocomplete
                            autoFocus
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '10px'
                            }}
                           
                            types={['(regions)']}
                        />
        </FormControl>
        </Grid>
        <Grid item xs={12}>
        <FormControl className={classes.formControl}>
        <Autocomplete
                        autoFocus
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '10px'
                        }}
                       
                        types={['(regions)']}
                    />
        </FormControl>
        </Grid>
        </Grid>

    )
        
        
    
} 