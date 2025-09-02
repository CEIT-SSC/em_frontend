import { Avatar, Flex } from 'antd'
import Image from 'next/image'

interface TimelineDotProps {
  logoSrc?: string
  size?: string
}

export default function TimelineDot({ 
  logoSrc = '/images/logo/hayahool.png',
  size = '5vw' 
}: TimelineDotProps) {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        width: size,
        aspectRatio: 1,
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'darkgreen',
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: '80%',
            aspectRatio: 1,
            borderRadius: '50%',
            backgroundColor: 'white',
            overflow: 'hidden'
          }}
        >
          <Avatar 
            src={logoSrc} 
            shape="square" 
            style={{ width: '80%', height: '80%' }}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
