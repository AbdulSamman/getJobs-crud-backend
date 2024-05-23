
export type JobRaw = {
id:number,
title:string,
company:string,
url:string,
description:string,
skillList:string,
publicationDate:string,

}


export  type RawSkill ={
    idCode:string,
    name:string,
    url:string,
    description:string

}

export type Job = {
    id: number;
    title: string;
    company: string;
    url: string;
    description: string;
    skillList: string;
    publicationDate: string;
    skills: RawSkill[]
    toDo:ToDo
  };
export const nullObjectSkill ={
    idCode:"",
    name:"",
    url:"",
    description:""

}
export type ToDo={
    text:string,
    url:string
}

