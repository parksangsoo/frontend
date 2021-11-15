import React from 'react';
import styled from 'styled-components';

const TeleType = (props) => {

    const tels = [
        {tel_id:0,tel_name:"SKT"},
        {tel_id:1,tel_name:"KT"},
        {tel_id:2,tel_name:"LG"},
    ]

    if(props.mode==="signup"){
        return (
            <TeleTypeBox>
                {tels.map((tel) => {
                    if(props.telecom === tel.tel_name){
                        return(
                            <SignUpButton bg="orange" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</SignUpButton>
                        )
                    }else{
                        return(
                            <SignUpButton bg="grey" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</SignUpButton>
                        )
                    }
                })}
            </TeleTypeBox>
        );
    }else if(props.mode==="useredit"){
        return (
            <TeleTypeBox>
                {tels.map((tel) => {
                    if(props.telecom === tel.tel_name){
                        return(
                            <UserEditButton bg="orange" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</UserEditButton>
                        )
                    }else{
                        return(
                            <UserEditButton bg="grey" key={tel.tel_id} value={tel.tel_name} onClick={props.telecomtypeselect}>{tel.tel_name}</UserEditButton>
                        )
                    }
                })}
            </TeleTypeBox>
        );
    }
    
};

const UserEditButton = styled.button`

`;

const SignUpButton = styled.button`
    margin-bottom: 15px;
    border: none;
    width:99px;
    height:99px;
    border-radius: 5px;
    background-color: white;
    color: ${props => props.bg};
    border: solid 1px ${props => props.bg};
`;

const TeleTypeBox = styled.div`
    display:flex;
    margin: 0 auto;
    width: 375px;
    flex-wrap: wrap;
    justify-content:space-evenly;
    padding-left:0px;
`;

export default TeleType;