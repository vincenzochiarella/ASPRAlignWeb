import React from 'react'
import { Typography, Box, Link, Divider } from '@material-ui/core';
// import InputDescription from '../../docs/InputDescription.json'
// import Introduction from '../../docs/Introduction.json'

const TextWrapper = ({ children }) => (
    <Box paddingLeft={3} margin={3} bgcolor="inerith">
        <Typography variant='body1' >
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
                    AspraLign 
                </ChapterTitle>
                <TextWrapper>
                    Documents for a correct usage of the web page<br/>
                    Please visit <a href="https://github.com/bdslab/aspralign/blob/master/README.txt">README of command line tool</a>to read more documentation or the <a href="https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2689-5">article</a>

                </TextWrapper>
            </ChapterWrapper>
            <Divider/>
            <ChapterWrapper>
               <ChapterTitle> 1. Operation </ChapterTitle> 
               <TextWrapper>
                    At the top of che ASPRAlign main pages, we can find a tabular module in order to select options for output. <br/>
                    In the first tab there is the selection of what type of input we want <br/>
                        1. <strong>Alignment</strong>: each node of the output tree shows the result of an alignment of two molecules of RNA.<br/>
                        Colors indicate what type of operation we need to fill the distance between nodes written in the label.<br/>
                        <font color='red'>RED</font>: if we need an insertion<br/>
                        <font color='yellow'>YELLOW</font>: if we have to change the operation between nitrogenous bases of RNA <br/>
                        <font color='green'>GREEN</font>: if there is a match <br/>
                        2. <strong>Structural</strong>: create a binary tree which shows the structure of the RNA molecules<br/>
                        3. <strong>Algebraic</strong>: create a tree which shows an Algebraic represetantion of the RNA molecules<br/>
                    
               </TextWrapper>
            </ChapterWrapper>
            <Divider/>
            <ChapterWrapper>
                <ChapterTitle>
                    2. Molecule input
                </ChapterTitle>
                <TextWrapper>
                    The tab where put the molecule with two types of format available: <br/>
                    1. <strong>Arc Annotated Sequence</strong><br/>
                    Example:<br/>
                    AAGAGCUAUUUCCCUUAAGGGGGCACUAUUGAACUCCAUGAAACCGGAUUUGGCCCCGCGG<br/>
                    (2,15);(3,13);(4,7);(10,18);(20,44);(21,26);(22,24);(28,35);(29,33);(31,34);(36,47);(41,50);(53,59);(55,61) <br/>
                    2. <strong>Dot Bracket Notation</strong> <br/>
                    Example: <br/>
                    AAGACCUGCACGCUAGUU<br/>
                    .(((..)[(..)))..].<br/>
                </TextWrapper>
            </ChapterWrapper>
            <Divider/>
            <ChapterWrapper>
                <ChapterTitle>
                    3. Other options
                </ChapterTitle>
                <TextWrapper>
                    There are other 3 options (2 available only when alignment is selected)<br/>
                    1. Check presence of "Special" pair that could create error in tree representation<br/>
                    Only with alignment:<br/>
                        2. Show only distance of two aligned tree <br/>
                        3. Change configuration file that determins the value showed in the distance.<br/>                       

                </TextWrapper>
            </ChapterWrapper>
            <Divider/>
            <ChapterWrapper>
                <ChapterTitle>
                    4. Run ASPRAlign
                </ChapterTitle>
                <TextWrapper>
                    In order to get the tree wanted click the button "Run AspraLign" or remove all option changed with the button aside
                </TextWrapper> 
                <TextWrapper>
                    After the elaboration you could download the file with the calculed tree in two different format: <br/>
                    1. JSON, with the jsoned tree used to show it in UI
                    2. TEX, convertable to pdf
                </TextWrapper>
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