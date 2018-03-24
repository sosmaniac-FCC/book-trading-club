import React from 'react';

const CompareBody = (props) => (
    <div className="row" id="pair-compare">
        <div className="col s6 m5 l4 offset-s0 offset-m1 offset-l2">
            <div className="row">
                <div className="col s12">
                    <h6 className="center">OFFER</h6>
                </div>
                <img className="col s12" src={props.cache.bookOffer.offerImgUrl}/>
                <div className="col s12">
                    <h6 className="center">OWNER: {props.cache.senderId}</h6>
                </div>
            </div>
        </div>
        <div className="col s6 m5 l4">
            <div className="row">
                <div className="col s12">
                    <h6 className="center">FOR</h6>
                </div>
                <img className="col s12" src={props.cache.bookQuarry.quarryImgUrl}/>
                <div className="col s12">
                    <h6 className="center">OWNER: {props.cache.receiverId}</h6>
                </div>
            </div>
        </div>
    </div>
);

export default CompareBody;