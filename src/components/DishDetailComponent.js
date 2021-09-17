import React from "react";
import { Component } from "react";
import { Card,CardImg,CardText,CardTitle} from "reactstrap";


class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }
    renderDish(dish){
        if(dish != null)
            return(
                <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> <b>{dish.description}</b> </CardText>
                    </Card>
                </div>
            );
        else
                return(
                    <div></div>
                );
    }
    renderComments(dish){
        if(dish != null){
            return(
                <div>
                    <h3>Comments</h3>
                
                {dish.comments.map((item)=>{
                    return (
                    <div key={item.id}>
                        <p>{item.comment}</p>
                        <p>---{item.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                    </div>
                    )
                })}
                </div>
            )
        }
    }
    
    render(){
        return(
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div> 
            </div>
            </div>
        );
    }
}
export default DishDetail;