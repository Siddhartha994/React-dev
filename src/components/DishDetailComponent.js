import React, { Component } from "react";

import { Breadcrumb,BreadcrumbItem ,Card,CardImg,CardText,CardTitle,Button, Modal,ModalHeader,ModalBody,Row,Col, Label,FormGroup} from "reactstrap";
import { Link } from 'react-router-dom';
import { LocalForm,Control,Errors} from "react-redux-form"
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

    

    function RenderDish({dish}){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardTitle> {dish.name} </CardTitle>
                        <CardText> <b>{dish.description}</b> </CardText>
                    </Card>
                </div>
            );
    }
        
    function RenderComments({comments, addComment, dishId}) {
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
                        <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }else
            return(
                <div></div>
            );
    }
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
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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
                        <FormGroup>
                                <Label htmlFor="rating">Rating</Label>                                
                                <Control.select model=".rating" id="rating" name="rating" className="form-control" placeholder="Select a Rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows="6">
                                </Control.textarea>
                            </FormGroup>
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
    
    const DishDetail = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
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
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
            </div>
            );
        }
        
export default DishDetail;