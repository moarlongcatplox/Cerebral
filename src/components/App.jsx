'use strict';
//material-ui
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { blue } from '@material-ui/core/colors';
const blue700=blue[700];

//local
import LeftNav from './nav/LeftNav';
import Overview from './views/Overview';
import SkillBrowser from './views/SkillBrowser';
import SpFarming from './views/SpFarming';
import Contracts from './views/Contracts';
import Character from './views/Character';
import Settings from './views/Settings';

//react
import React from 'react';
import {Route} from 'react-router-dom';

//electron
import { remote } from 'electron';

//frameless-titlebar
import TitleBar from 'frameless-titlebar';

//---------------------------------end imports---------------------------------


//frameless titlebar 
const currentWindow = remote.getCurrentWindow();


const muiTheme = createMuiTheme(
  {
    palette: {
        type: 'dark',
        //accent1Color: blue700,
        
    },
});

const bufferHeight = 30; 
//needed to make scrolling work properly. overflow-y MUST be none in the main.css 
//to prevent the custom titlebar from scrolling awaaaaaay.  note the calculation
//for the mainDiv height below. overflow-Y will not produce a scrollbar without a
//height specified.
const styles = {
    mainDiv: {
        margin: '20px 0 0 230px',
        padding: '0 0 0 0',
        height: `calc(100vh - ${bufferHeight}px)`,
        overflowY: 'auto',
    }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        // skill browser removed while replacement for sortable tree is found
        
        return (
        <div>
            <div>
            <TitleBar
              //iconSrc={icon} // app icon
              currentWindow={currentWindow} // electron window instance
              platform={process.platform} // win32, darwin, linux
              //menu={menu}
              theme={{
                "bar": {
                    "palette": "dark",
                    "height": "28px",
                    "color": "rgb(0, 0, 0)",
                    "background": "rgba(75, 75, 75, 0)",
                    "borderBottom": "",
                    "inActiveOpacity": 0.6,
                    "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, sans-serif",

                    "title": {
                      "color": "inherit",
                      "align": "center",
                      "fontFamily": "inherit",
                      "fontWeight": "normal"
                    },
                    "button": {
                      "maxWidth": 100,
                      "disabledOpacity": 0.3,
                      "active": {
                        "color": "#fff",
                        "background": "#303030"
                      },
                      "default": {
                        "color": "inherit",
                        "background": "transparent"
                      },
                      "hover": {
                        "color": "inherit",
                        "background": "rgba(255,255,255,0.3)"
                      }
                    }
                  },
                  "controls": {
                    "border": "none",
                    "layout": "right",
                    "borderRadius": 0,
                    "normal": {
                      "default": {
                        "color": "inherit",
                        "background": "transparent"
                      },
                      "hover": {
                        "color": "#fff",
                        "background": "rgba(255,255,255,0.3)"
                      }
                    },
                    "close": {
                      "default": {
                        "color": "inherit",
                        "background": "transparent"
                      },
                      "hover": {
                        "color": "#fff",
                        "background": "#e81123"
                      }
                    }
                  },
                  "menu": {
                    "palette": "dark",
                    "style": "default",
                    "item": {
                      "height": 30,
                      "disabledOpacity": 0.3,
                      "default": {
                        "color": "inherit",
                        "background": "transparent"
                      },
                      "active": {
                        "color": "#fff",
                        "background": "rgb(241, 146, 95)"
                      }
                    },
                    "separator": {
                      "color": "#e1e4e8"
                    },
                    "header": {
                      "show": true,
                      "color": "#6a737d"
                    },
                    "accelerator": {
                      "color": "#6a737d"
                    },
                    "icon": {
                      "highlight": true
                    },
                    "list": {
                      "minWidth": 200,
                      "maxWidth": 400,
                      "marginBottom": 10,
                      "background": "#303030",
                      "boxShadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                      "zIndex": 2001
                    },
                    "overlay": {
                      "background": "black",
                      "opacity": 0.4,
                      "zIndex": 2000
                    },
                    "marginRight": 0
                  }
                // any theme overrides specific
                // to your application :)
              }}
              title={"Cerebral Fork Alpha"}
              onClose={() => currentWindow.close()}
              onMinimize={() => currentWindow.minimize()}
              onMaximize={() => currentWindow.maximize()}
              // when the titlebar is double clicked
              onDoubleClick={() => currentWindow.maximize()}
            >
              {/* custom titlebar items */}
            </TitleBar>
          </div>
            
            <MuiThemeProvider theme={muiTheme}>
                <div>
                    <LeftNav/>

                    <div style={styles.mainDiv}>
                        <Route exact path="/" component={Overview} />
                        <Route path="/sp-farming" component={SpFarming} />
                        
                        <Route path="/contracts" component={Contracts} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/characters/:characterId" component={Character} />
                    </div>
                </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
