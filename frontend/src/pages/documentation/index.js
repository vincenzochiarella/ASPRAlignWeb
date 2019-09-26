import React from 'react'
import { Typography, Box, Link } from '@material-ui/core';
// import InputDescription from '../../docs/InputDescription.json'
// import Introduction from '../../docs/Introduction.json'

const TextWrapper = ({ children }) => (
    <Box paddingLeft={3} margin={3} bgcolor="inerith">
        <Typography variant='caption' >
            {children}
        </Typography>
    </Box>
)
const RefWrapper = ({ children }) => (
    <Box paddingLeft={3} margin={3} bgcolor="secondary">
        <Link target="_blank" rel="noopener" href={children.link}>
            {children.text}
        </Link>
    </Box>
)
const ChapterTitle = ({ children }) => (
    <Typography variant="h4">
        {children}
    </Typography>
)
const ChapterWrapper = ({ children }) => (
    <Box paddingLeft={2}>
        {children}
    </Box>
)

//USAGE 
//Use tag chapter wrapper to wrap ChapterTitle and Text Wrapper
class Documents extends React.Component {
    render() {
        return (<>            
            <ChapterWrapper>
                <ChapterTitle>
                   AspraLign tool
                </ChapterTitle>
                {/* {Introduction.body.map(par => (
                    <TextWrapper>{par.paragraph}</TextWrapper>
                ))} */}
            </ChapterWrapper>
            <ChapterWrapper>
               <ChapterTitle> </ChapterTitle> 
            </ChapterWrapper>
            <ChapterWrapper>
                <ChapterTitle>
                    1. Inputs
                </ChapterTitle>
                {/* {InputDescription.body.map(par => (
                    <TextWrapper>{par.paragraph}</TextWrapper>
                ))}
                {InputDescription.refs.map(ref => (
                    <RefWrapper >{ref}</RefWrapper>
                ))} */}
            </ChapterWrapper>
        </>
        )
    }

}
export default Documents

// <>            
//             <ChapterWrapper>
//                 <ChapterTitle>
//                     {/* {Introduction.title} */}

//                 </ChapterTitle>
//                 {/* {Introduction.body.map(par => (
//                     <TextWrapper>{par.paragraph}</TextWrapper>
//                 ))} */}
//                 {Introduction.refs.map(ref => (
//                     <RefWrapper>{ref}</RefWrapper>
//                 ))}
//             </ChapterWrapper>
//             <ChapterWrapper>
//                <ChapterTitle> </ChapterTitle> 
//             </ChapterWrapper>
//             <ChapterWrapper>
//                 <ChapterTitle>
//                     1. {InputDescription.title}
//                 </ChapterTitle>
//                 {InputDescription.body.map(par => (
//                     <TextWrapper>{par.paragraph}</TextWrapper>
//                 ))}
//                 {InputDescription.refs.map(ref => (
//                     <RefWrapper >{ref}</RefWrapper>
//                 ))}
//             </ChapterWrapper>
//         </>