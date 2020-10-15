import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export type ActionProps = {
  click: (arg0: {
    keyword: string;
    defenition: string;
  }) => Object;
};

export type DataProps = {
  simplecardData:{
    keyword: string;
    defenition: string;
  }
};

type Props = ActionProps & DataProps & {
  classes: any;
  className?: string;
  style?: any;
}

class SimpleCard extends React.Component<Props, State>  {
  constructor(props: Props){
    super(props);
  }

  render(){
    const { classes, click } = this.props;
    const { keyword, defenition } = this.props.simplecardData;
    const onClickBtn = function(e){
      click({
        keyword: "click_key",
        defenition: "click_def"
      })
    }
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {keyword}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {defenition}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={onClickBtn} size="small" color="primary">
            Click
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SimpleCard);
