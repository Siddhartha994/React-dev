import React, { Component } from "react";

import { Breadcrumb,BreadcrumbItem ,Card,CardImg,CardText,CardTitle,Button, Modal,ModalHeader,ModalBody,Row,Col, Label} from "reactstrap";
import { Link } from 'react-router-dom';
import { LocalForm,Control,Errors} from "react-redux-form"

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state = { isModalOpen: false }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        toggleModal(){
            this.setState({isModalOpen: !this.state.isModalOpen})
        }
        handleSubmit(values){
            console.log("Current State is : " + JSON.stringify(values));
            alert("Current State is : " + JSON.stringify(values));
        }
        render(){
            return(
                
                <div>
                <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-regular fa-pencil"> Submit Comment</span>
                </Button>    
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody> 
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}> 
                            <Row>
                                <Label htmlFor="rating" md="2"><b>Rating</b></Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                            placeholder="Rating" className="form-control"
                                            validators={{
                                                required
                                            }}>
                                            <option>Please Select</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                        </Control.select>
                                    </Col>
                                    <Errors 
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                    />
                            </Row>
                            <Row>
                                <Label htmlFor="fullname" md="12"><b>Your Name</b></Label>
                                <Col md={12}>
                                    <Control.text model=".fullname" id="fullname" name="fullname"
                                        placeholder="Your Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                </Col>
                                <Errors 
                                        className="text-danger"
                                        model=".fullname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </Row>
                            <Row row> 
                                <Label htmlFor="message" md={12}><b>Comment</b></Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message" 
                                    rows="9"
                                    className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            );
        }
    }

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
                        <CommentForm/>
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