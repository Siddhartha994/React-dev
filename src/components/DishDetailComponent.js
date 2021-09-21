import React from "react";

import { Breadcrumb,BreadcrumbItem ,Card,CardImg,CardText,CardTitle} from "reactstrap";
import { Link } from 'react-router-dom';



    function RenderDish({dish}){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top width="100%" src={dish.image} alt={dish.name} />
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> <b>{dish.description}</b> </CardText>
                    </Card>
                </div>
            );
    }
    function RenderComments({comments}){
        if(comments != null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((item)=>{
                            return (
                            <li key={item.id}>
                                <p>{item.comment}</p>
                                <p>---{item.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }else
            return(
                <div></div>
            );
    }
    
    const DishDetail = (props) => {
            
        
            return (
            <div className="container">
                <div className = "row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>       
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments = {props.comments} />
                </div>
            </div>
            );
        }
    
export default DishDetail;