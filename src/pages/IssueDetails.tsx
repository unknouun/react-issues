import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchIssueByNumber, fetchIssueComments } from '../api/issues';
import styled from 'styled-components';
import moment from 'moment';

interface CommentsDetailsState {
    state: string;
    title: string;
    number: number;
    created_at: string;
    user: {
        login: string;
        avatar_url: string;
    };
    body: string;
}

interface StateLabelProps {
    readonly open?: boolean;
}

interface CommentProps {
    readonly author?: boolean;
}

const IssueWrapper = styled.div``;
const IssueContainer = styled.div``;
const NoIssueText = styled.h3``;
const IssueHeader = styled.div`
    text-align: center;
`;
const StateLabel = styled.span<StateLabelProps>`
    width: 85px;
    font-size: 14px;
    font-weight: 200;
    line-height: 25px;
    text-transform: uppercase;
    margin-right: 5px;
    color: #fff;
    background-color: ${(props) => (props.open ? '#32cd32' : '#b22222')};
    border: 1px solid ${(props) => (props.open ? '#32cd32' : '#b22222')};
    border-radius: 2em;
    @media only screen and (max-width: 1022px) {
        display: none;
    }
`;
const IssueTitle = styled.h2`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 300;
`;
const IssueSubtitle = styled.p``;
const IssueBody = styled.div`
    max-width: 1000px;
    margin: 40px auto 0;
    padding-top: 50px;
    @media only screen and (max-width: 1022px) {
        margin-left: 10px;
    }
`;
const CommentAuthor = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
`;
const AuthorAvatar = styled.img`
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-right: 25px;
    margin-top: 8px;
`;
const Comment = styled.div<CommentProps>`
    border-radius: 15px;
    background: #dcdcdc;
    color: #000;
    padding: 20px;
    font-weight: 900;
    font-family: arial;
    position: relative;
    &:before {
        content: '';
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 15px solid #dcdcdc;
        border-right: 15px solid transparent;
        border-top: 15px solid #dcdcdc;
        border-bottom: 15px solid transparent;
        left: -10px;
        top: 10px;
        transform: rotate(-42deg);
    }
`;
const TextContainer = styled.div`
    overflow: scroll;
    max-width: 900px;
`;
const DescriptionHeader = styled.div``;
const Description = styled.pre`
    font-weight: 300;
    display: inline-block;
`;

const IssueDetails = () => {
    const location = useLocation();
    const [details, setDetails] = useState<CommentsDetailsState | null>(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState<CommentsDetailsState[]>([]);
    useEffect(() => {
        if (location && location.pathname) {
            let splitPath = location.pathname.split('/');
            let issue_number = Number(splitPath[splitPath.length - 1]);
            fetchIssueByNumber(issue_number).then((res) => {
                setDetails(res.data);
                setAuthor(res.data.user.login);
            });
            if (author) {
                fetchIssueComments(issue_number).then((res) => {
                    setComments(res.data);
                });
            }
        }
    }, [location, author]);

    const renderStateLabel = (state: string) => {
        if (state === 'open') {
            return <StateLabel open>open</StateLabel>;
        } else if (state === 'closed') {
            return <StateLabel>closed</StateLabel>;
        } else {
            return null;
        }
    };

    return (
        <IssueWrapper>
            {details ? (
                <IssueContainer>
                    <IssueHeader>
                        <IssueTitle>
                            {renderStateLabel(details.state)}
                            {details.title} #{details.number}
                        </IssueTitle>
                        <IssueSubtitle>
                            {' '}
                            Opened {moment(
                                details.created_at
                            ).fromNow()} by {details.user.login}
                        </IssueSubtitle>
                    </IssueHeader>
                    <IssueBody>
                        <CommentAuthor>
                            <AuthorAvatar src={details.user.avatar_url} />
                            <Comment author>
                                <TextContainer>
                                    <DescriptionHeader>
                                        {details.user.login} commented{' '}
                                        {moment(details.created_at).fromNow()}
                                    </DescriptionHeader>
                                    <Description>{details.body}</Description>
                                </TextContainer>
                            </Comment>
                        </CommentAuthor>
                        {comments.length
                            ? comments.map((comment, index) => {
                                  return (
                                      <CommentAuthor key={index}>
                                          <AuthorAvatar
                                              src={comment.user.avatar_url}
                                          />
                                          <Comment author>
                                              <TextContainer>
                                                  <DescriptionHeader>
                                                      {comment.user.login}{' '}
                                                      commented{' '}
                                                      {moment(
                                                          comment.created_at
                                                      ).fromNow()}
                                                  </DescriptionHeader>
                                                  <Description>
                                                      {comment.body}
                                                  </Description>
                                              </TextContainer>
                                          </Comment>
                                      </CommentAuthor>
                                  );
                              })
                            : null}
                    </IssueBody>
                </IssueContainer>
            ) : (
                <NoIssueText>No issue found</NoIssueText>
            )}
        </IssueWrapper>
    );
};

export default IssueDetails;
