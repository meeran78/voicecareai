'use client'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import axios from 'axios';

function CareAgent() {
  const  {sessionId} = useParams();
  
  useEffect(() => {
    GetSessionInfo();
  }, [sessionId])

  const GetSessionInfo = async () => {
    const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`)
    console.log(result.data);
  }

  return (
    <div>{sessionId}</div>
  )
}

export default CareAgent