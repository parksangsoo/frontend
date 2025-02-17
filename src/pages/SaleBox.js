import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as foldersCreators} from '../redux/modules/salebox';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from "styled-components";
import Grid from "../elements/Grid";
import {companyLogo, fullBookmark} from '../image'

const SaleBox = () => {
    const dispatch = useDispatch();
    const folders = useSelector((state) => state.salebox.list);
    const list_length = folders?.length;
    
    useEffect(() => {
      dispatch(foldersCreators.getFoldersMiddleware());
      
    }, []);

    return (
      <React.Fragment>
        <div>
          <Notice>{list_length}개가 보관되어있어요</Notice>
            {folders?.map((item)=>{
              return(
                <Grid margin="0 auto" width="375px" padding="10px 0"> 
                  <Couponbox>

                    <Img onClick={()=>{history.push(`/api/detail/${item?.id}`)}}><img src={companyLogo}/></Img>
                    <Textbox onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                      <P1>{item.couponTitle}에서</P1>
                      <P2>{item.couponSubTitle} 할인 받기</P2>
                    </Textbox>

                  <BUTTON onClick={()=>{
                    dispatch(foldersCreators.delFoldersMiddleware(item.id));
                    dispatch(listCreators.addZzim(item.id,true));
                  }}><img src={fullBookmark} /></BUTTON>
                  </Couponbox>
                </Grid>
              )
          })}
        </div>
      </React.Fragment>
    );
};

const Notice = styled.div`
font-weight: bold;
font-size:20px;
padding: 20px;
`

const Couponbox = styled.div`
display:flex;
width : 375px;
height: 60px;
`
const Img = styled.div`
width:50px;
padding-left:20px;
`

const Textbox = styled.div`
width:200px;
padding-left:20px;
`


const P1 = styled.p`
margin-top: 0px;
font-size: 14px;
`
const P2 = styled.p`
margin-top: -5px;
font-size:16px;
font-weight: bold;
padding-left:-20px;
`

const BUTTON = styled.button`
position: absolute;
right:20px;
height: 50px;
border: none;
background-color:white;
`

export default SaleBox;