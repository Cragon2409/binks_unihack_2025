import React from 'react'

import {
  Card,
  theme
} from 'antd';

import { useAppSelector } from '../../../API/hooks';
import { Assessment } from '../../../common/Types';

export const JarJarMeter: React.FC = () => {
  const { token } = theme.useToken();
  const assessments = useAppSelector((state) => state.assessments);
  
  const currentDate = new Date().toISOString();
  const jarJarHappy = assessments.assessments.filter((ass : Assessment) => (
    (ass.completeDate ?? "ZZZZZ").localeCompare(ass.dueDate ?? "") 
      && !(ass.completeDate == null && (ass.dueDate.localeCompare(currentDate)))
  )).length <= (assessments.assessments.length / 2)  

  return (
    <Card 
      style={{ 
        width: '100%', 
        height:"100%",
        boxShadow: token.boxShadow
      }}  
      styles={{
        header: {
          borderBottom: 'none'
        },
        body: {
          paddingTop: 0
        }
      }}
      variant='borderless'
      title="Jar Jar Meter"
    > 
      {(jarJarHappy) ? (
        <>
          Jar Jar Approves of your current academic performance!
          <img src={"https://media4.giphy.com/media/olnuKV0a3Et5C/giphy.gif?cid=6c09b952gwey4uwypxcnfr2hrel245qx4wcd85bgnerngfxh&ep=v1_gifs_search&rid=giphy.gif&ct=g"} alt="Gif" style={{ width: '100%' }} />
        </>
        ) :
        (
          <>
            Jar Jar encourages you to keep going and improve! (menacingly)
            <img src={"https://media.tenor.com/Kn7YgWfsMxAAAAAM/darth-jar-jar.gif"} alt="Gif" style={{ width: '100%' }} />
          </>
        )}
    </Card>
  )
}