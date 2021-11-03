import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

const Header = () => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const user = useSelector((state) => state.user.user);
    const [admin,setAdmin] = useState(user?user:"");

    const logout = () => {
        dispatch(userActions.logoutFB())
    }
    const mypage = () => {
        history.push("/mypage");
    }

    useEffect(()=>{
        if(user){
            setAdmin(user);
        }
    },[user])

    return (
        <React.Fragment>
            {is_login?(
            <div>
                <p>로그인됨</p>
                <button onClick={logout}>로그아웃</button>
                <button onClick={mypage}>마이페이지</button>
                <button onClick={()=>{
                    history.push('/salebox')
                }}>쿠폰함</button>
            </div>):(<div>
                <p>로그인안됨</p>
                <button onClick={()=>{
                    history.push('/signup')
                }}>회원가입</button>
                <button onClick={()=>{
                    history.push('/login')
                }}>로그인</button>
                </div>)}
                <div>
                    {admin.role === "ADMIN"?(<button onClick={()=>{
                        history.push("/salelist");
                    }}>할인보기</button>):""}
                </div>
            
        </React.Fragment>
    );
};

export default Header;