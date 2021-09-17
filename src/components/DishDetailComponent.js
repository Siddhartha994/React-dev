import React from "react";

import { Card,CardImg,CardText,CardTitle} from "reactstrap";



    function renderDish(dish){
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
    function renderComments(dish){
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
    
    const DishDetail = (props) => {
            
        if(props.dish != null){
            return (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {renderDish(props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {renderComments(props.dish)}
                </div> 
            </div>
            </div>
            );
        }
        else
            return (
                <div></div>
            );
    }
    
export default DishDetail;