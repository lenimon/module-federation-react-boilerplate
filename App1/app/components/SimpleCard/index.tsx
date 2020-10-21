import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { SEL_KEY } from '../../containers/ConnectedCard/constants';

const styles = theme => ({
  root: {
    minWidth: 345,
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
  [SEL_KEY]:{
    keyword: string;
    defenition: string;
  }
};

type Props = ActionProps & DataProps & {
  classes: any;
  className?: string;
  style?: any;
}

class SimpleCard extends React.Component<Props>  {
  constructor(props: Props){
    super(props);
  }

  // Exposing the onClickBtn handler. On call, invokes the click dispatch action from props
  onClickBtn = () => {
    this.props.click({
      keyword: "click_key",
      defenition: "click_def"
    })
  }

  render(){
    const { classes, click } = this.props;
    const { keyword, defenition } = this.props[SEL_KEY];
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
      </Card>
    );
  }
}

// Proxy wrapper over class component not needed unless the ref is not passed down by the composer wrappers
function SimpleCardProxy(props) {
  return <SimpleCard {...props} ref={props.simpleCardRef} />;
}

export default withStyles(styles)(SimpleCardProxy);
