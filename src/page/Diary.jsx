import React, { useContext, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import {getStringDate} from '../util/date'
import { emotionList } from '../util/emotion';

const Diary = () => {

    const {id} =useParams();
    // console.log(id)
    const diaryList=useContext(DiaryStateContext)
    const navigate=useNavigate();
    const [data,setData]=useState();

    //page title 바꾸기
    useEffect(()=>{
        const titleElement =document.getElementsByTagName('title')[0];
        titleElement.innerHTML=`감정 일기장_${id}번 일기`
    },[])

    useEffect(() => {
        if(diaryList.length >=1 ){
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id) === parseInt(id)
            );
            // console.log(targetDiary)

            if(targetDiary){
                //일기가 존재할때
                setData(targetDiary)
            }else{
                //일기 없을때
                alert('없는 일기입니다.')
                navigate('/',{replace:true});
            }
        }
    },[id,diaryList])

    if(!data){
        return (
            <div className='DiaryPage'>로딩중입니다..</div>
        );
    }else{
        const currentEmotionData=emotionList.find((it)=>parseInt(it.emotion_id)===parseInt(data.emotion))
        // console.log(currentEmotionData)
        
        return (
            <div className='DiaryPage'>
                <MyHeader 
                headText={`${getStringDate(new Date(data.date))} 기록`} 
                leftChild={<MyButton text={'< 뒤로가기'} onClick={()=>navigate(-1)}/>}
                rightChild={<MyButton text={'수정하기'} onClick={()=>navigate(`/edit/${data.id}`)}/>}
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={currentEmotionData.emotion_img} alt="" />
                            <div className='emotion_descript'>
                                {currentEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className='diary_content_wrapper'>
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;