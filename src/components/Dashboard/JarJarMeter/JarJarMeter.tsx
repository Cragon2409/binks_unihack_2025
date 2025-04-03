import React from 'react'

import {
  Card,
  theme
} from 'antd';

export const JarJarMeter: React.FC = () => {
  const { token } = theme.useToken();

  const jarJarHappy = false;

  return (
    <Card title="Jar Jar Meter" style={{ width: 300, height:"100%", backgroundColor : token.colorBgBase}}> 
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