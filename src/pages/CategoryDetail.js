import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { listCreators } from '../redux/modules/main';
import { history } from '../redux/configureStore';
import styled from 'styled-components';
import Grid from "../elements/Grid";
import { colorBookmark, companyLogo } from '../image';
import {actionCreators  as foldersCreators } from '../redux/modules/salebox';
import InfiniteScroll from 'react-infinite-scroll-component';

const CategoryDetail = (props) => {
    const dispatch = useDispatch();
    // 넘어온 props 확인해서 내가 보내줘야 할 타입을 추출
    const type = props.match.params.type
    console.log(type)
    const is_login = useSelector((state)=>state.user.is_login)  

    // 무한스크롤 페이지_초기값0
    const [page,setPage] = useState(0)
    // 리덕스에있는 데이터 불러오기(리듀서 정보_hasMore,pagingList)
    const DcInfoList = useSelector((state) => state.main.pagingList)
      console.log(DcInfoList[0]?.data)
    const hasMore =  useSelector((state) => state.main.hasMore)

    React.useEffect(() => {
      // 내가 넘겨줄 값들 _ 현재 페이지, 몇개보여줄건지, 타입
      const params = {page : 0, size : 6}
      dispatch(listCreators.getListMW(type,params));
      // 페이지 상태 변화
      setPage( page + 1 );
      }, []);

      // 스크롤이 마지막에 닿았을때 다음 페이지로 이동시켜주는 함수
      const fetchPaging = () => {
        setPage( page + 1 )
        setTimeout(() => {
            if(hasMore){
              dispatch(listCreators.getListMW(type,page));
            }
        },1000)
    }


return(
    <Grid width="375px" >
        <div>
        <P>{type} 할인</P>
        <P>다 모아두었어요</P>
        </div>
  {DcInfoList?
    <InfiniteScroll
    dataLength={DcInfoList.length}
    next={fetchPaging}
    hasMore={hasMore}
    loader={<h4>Loading ...</h4>}>  
      <DcBox>
        {
        DcInfoList[0]?.data?.map((item) => {
          return (
            <Wrap>
            <DcList key={item.id} onClick={()=>{history.push(`/api/detail/${item?.id}`)}}>
                <Img> <img src = {item.couponLogo}/> </Img>
              <DcInfo>
              <Text>{item.couponBrand}에서</Text>
              <Text2>{item.couponSubTitle} 할인 받기</Text2>
              </DcInfo> 
              </DcList>

              <Imgbox><img src={colorBookmark} onClick={()=>{
                if(is_login){
                const couponId = {couponId : item.id};
                dispatch(foldersCreators.addPostMW(couponId));
                alert("해당 쿠폰을 찜했습니다!")}
                else{alert("로그인이 필요한 서비스 입니다!")}}}/></Imgbox>
            </Wrap>
          );
        })} 
      </DcBox>
    </InfiniteScroll>
    : <div>더이상의 할인 정보가 없습니다!</div>
    }
    </Grid>
  ) 
}


const P = styled.p`
margin: 0 auto;
font-size : 20px;
width: 355px;
line-height:30px;
font-weight : bold;
padding-left:20px;
padding-top: 3px;
`
const DcBox = styled.div`
width : 375px;
margin: 20px auto;
`
const DcList = styled.div`
text-aling : center;
padding : 5px;
cursor : pointer;
display : flex;
`
const DcInfo = styled.div`
margin : 0 8px;
`
const Text =styled.p `
font-size : 14px;
`
const Wrap = styled.div`
position : relative;
width : 100%;
height : 72px;
`
const Text2 =styled.p `
font-weight: bold;
margin-top:-6px;
color : #FF8F00;
`
const Img = styled.span`
width : 40px;
height : 40px;
border : 1px solid grey;
margin : 18px;
border-radius:5px;
`
const Imgbox = styled.div`
width:20px;
height:20px;
position:absolute;
right:25px;
top : 38%;
`


export default CategoryDetail;