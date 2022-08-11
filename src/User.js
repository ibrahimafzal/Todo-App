import React  from 'react';
import "./App.css"
import { PureComponent } from "react";
class User extends React.Component {
    

    render()
    {
        console.warn('user component check-rerending')
        return (
            <div>
                <h1>user Component {this.props.count}</h1>
               
            </div>
        );
    }
}


