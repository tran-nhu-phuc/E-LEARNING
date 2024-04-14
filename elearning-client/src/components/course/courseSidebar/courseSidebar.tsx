import React, { useEffect, useRef, useState } from "react";
import "./courseSidebar.css";
import { ImFilm } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectLessons } from "../../../store/reducers/lessonsReducer";
import { useDispatch } from "react-redux";
import { Link } from 'react-scroll';
import {
  selectLessonId,
  setLessonId,
} from "../../../store/reducers/lessonIdReduce";
import { formatDuration } from "../../../common/formatDuration.common";
import { selectLessonState } from "../../../store/reducers/lessonState";
const CourseSidebar = (): JSX.Element => {
  const [position, setPosition] = useState<boolean>(true);
  const [animationPlay, setAnimationPlay] = useState<number>(0);
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const lessonRedux = useSelector(selectLessonState);
  const id = useSelector(selectLessonId);
  const handlePlay = (e:any,id: number, position: number) => {
    if (lessonRedux) {
      if (lessonRedux.position === position) {
        setAnimationPlay(lessonRedux.position);
      } else {
        setAnimationPlay(position);
      }
    } else {
      setAnimationPlay(position);
    }
    dispatch(setLessonId(id));
    setPosition(false);
  };
  // // Scroll to lesson
  // const stateScroll = useSelector(selectLessonState)
  // const lessonRef:any = useRef()
  // const scrollToLesson = () => {
  //   lessonRef.current.scrollIntoView({behavior: "smooth"})
  // }
  // useEffect(()=> {
  //   scrollToLesson();
  // },[stateScroll])
  return (
    <section className="sidebar_course">
      <h1>Nội Dung Bài Học</h1>
      <ul>
        {lessons?.length > 0 &&
          lessons
            .slice()
            .sort((a: any, b: any) => a.position - b.position)
            .map((lesson: any, index: number) => {
              return (
                  <li
                    onClick={(e) => handlePlay(e,lesson.id, lesson.position)}
                    key={lesson.id}
                    id={`${lesson.id}`}
                    style={
                      (position && !lessonRedux && lesson.position === 1) ||
                      (!lessonRedux &&
                        !position &&
                        animationPlay === lesson.position) ||
                      (lessonRedux &&
                        position &&
                        lesson.position === lessonRedux.position) ||
                      (lessonRedux && id && !position && lesson.id === id)
                        ? { backgroundColor: "#fff" }
                        : { backgroundColor: "#f0f0f0" }
                    }
                  >
                    <div className="sidebar_course_item">
                      <p>
                        <span>{lesson.position}. </span> {lesson.title}
                      </p>
                      <p className="sidebar_course_item_duration">
                        {(position && !lessonRedux && lesson.position === 1) ||
                        (!lessonRedux &&
                          !position &&
                          animationPlay === lesson.position) ||
                        (lessonRedux &&
                          position &&
                          lesson.position === lessonRedux.position) ||
                        (lessonRedux && id && !position && lesson.id === id) ? (
                          <img
                            src="../../../../wired-gradient-62-film.apng"
                            alt=""
                          />
                        ) : (
                          <ImFilm
                            style={{ width: 21, height: 21, paddingLeft: 2 }}
                          />
                        )}

                        {formatDuration(lesson.duration)}
                      </p>
                    </div>
                    {lesson.isFinished && lesson.isFinished === 1 ? (
                      <img
                        src="../../../../wired-gradient-37-approve-checked-simple.apng"
                        alt=""
                      />
                    ) : (
                      <img
                        src="../../../../wired-gradient-742-code.apng"
                        alt=""
                      />
                    )}
                  </li>
              );
            })}
      </ul>
    </section>
  );
};

export default CourseSidebar;
