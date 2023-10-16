
import request from'./request'
import axios from 'axios';
export const createExam =async (data) =>{
    return axios.post("mocktest/exam/create" , data);
}
export const getDataExam = ()=>{
    return axios.get("mocktest/exam/detailExams");
}

export const updateQuestion = async(data)=>{
    return axios.post("mocktest/question/update" , data)
}

export const deleteQuestion = (id)=>{
    return axios.delete(`mocktest/question/del/${id}`)
}

export const addQuestiontoSection = (data)=>{
    return axios.post("mocktest/question/addToSection" , data );
}
export const deleteSection = (id)=>{
    return axios.delete(`mocktest/section/del/${id}`)
}
export const deleteExam  = (id)=>{
    return axios.delete(`mocktest/exam/del/${id}`)
}

export const addSectionToExam = (data) =>{
    return axios.post("mocktest/exam/addSection" , data)
} 