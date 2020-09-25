import React, { FormEvent, useState } from 'react';

import './style.css';
import PageHeader from '../../componentes/pageHeader';
import TeacherItem,{Teacher} from '../../componentes/teacherItem';
import Input from '../../componentes/input';
import Select from '../../componentes/Select';
import api from '../../services/api';

function TeacherList() {

 
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')
   async function searchteachers(e: FormEvent) {
        e.preventDefault();
       const response= await api.get('classes', {
            params:
            {
                subject,
                week_day,
                time,
            }
        })
        setTeachers(response.data)
    }
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchteachers}>
                    <Select name="subject" label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={
                            [{ value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação Física', label: 'Educação Física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'história', label: 'história' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Quimica', label: 'Quimica' }]
                        } />

                    <Select name="week_day" label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={
                            [
                                { value: '0', label: 'Domingo' },
                                { value: '1', label: 'Segunda-feira' },
                                { value: '2', label: 'Terça-feira' },
                                { value: '3', label: 'Quarta-feira' },
                                { value: '4', label: 'Quinta-feira' },
                                { value: '5', label: 'Sexta-feira' },
                                { value: '6', label: 'Sábado' },

                            ]
                        } />

                    <Input type="time" name='time' label="Hora" value={time}
                        onChange={(e) => { setTime(e.target.value) }} />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher:Teacher) =>{
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;