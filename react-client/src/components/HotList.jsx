import React from "react";
import "../App.css";
import {
    Button,
    Collapse,
    Input,
} from "reactstrap";
import Axios from "axios";

// This structures the FavRecipeItem component. props should be one recipe object.
class HotList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            recipes: [],
        }
        this.toggleHot= this.toggleHot.bind(this);
        this.getSomeHotStuff= this.getSomeHotStuff.bind(this);
    }

    getSomeHotStuff() {
        
    }

    toggleHot() {
        return Axios.get('/hotList')
        .then(response => {
            this.setState({
                recipes: response.data,
                collapse: !this.state.collapse
            })
        })
    }

    render() {
        const { recipes } = this.state;
        const hotFive = recipes.map(recipe => (
            <li>{recipe}</li>
        ));
        return (
            <div>
            <i className=" fas fa-fire float-right" onClick={this.toggleHot}></i>
            <Collapse isOpen={this.state.collapse}>
                <ul>
                    {hotFive}
                </ul>
            </Collapse>
            </div>
        );
    }
};

export default HotList;
