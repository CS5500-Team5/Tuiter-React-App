/**
 * @jest-environment jsdom
 */
import {queryAllByText, render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import PollDisplay from "../components/pollDisplay";
import {act, create} from 'react-test-renderer';

//test if the poll display works as expected
describe("vote UI test", () => {
    const Tuit =
        {"_id": "2", "tuit": "tuit-with-poll", "postedBy": "user",
            "stats": {"replies": 2, "retuits": 3, "likes": 4, "dislikes": 11 },
            "isPoll": true, "isPollOpen": true,
            "pollOptions": [{"_id": "opt1", "optionText": "option 1", "numVoted": 0},
                {"_id": "opt2", "optionText": "option 2", "numVoted": 1}]}
    test("poll display UI test", async () => {
        render(
            <HashRouter>
                <PollDisplay text={""}
                             tuit={Tuit} vote={"opt1"}
                             createVote={() => {}} deleteVote={() => {}}/>
            </HashRouter>);
        //if the option text displayed correctly
        let opt1 = screen.getByText(`option 1`);
        expect(opt1).toHaveClass("text");
        //if the vote displayed correctly
        let vote = screen.getByText(`0`);
        expect(vote).toHaveClass("voteNumber");
        expect(vote).toHaveStyle("visibility: visible")
    })

    test("make a vote", async () => {
        const vote = () => {
            act(
                () => {
                    Tuit.pollOptions[0].numVoted++;
                    poll.update(
                        <PollDisplay text={""}
                                     tuit={Tuit} vote={"opt1"}/>
                    )
                }
            )
        }

        let poll
        act(
            () => {
                poll = create(
                    <PollDisplay text={""}
                                 tuit={Tuit} vote={""}
                                 createVote={vote} deleteVote={() => {}}/>
                )
            }
        )

        const root = poll.root;
        console.log(root)
        //option 1 is 0 and 0% at the beginning
        let option = root.findAllByProps({className: 'opt-1 '})[0];
        let voteNum = option.findByProps({className: 'voteNumber'});
        let bar = option.findByProps({className: 'progress'});
        expect(voteNum.children[0]).toBe('0');
        expect(bar.props.style.width).toBe("0%");
        //vote option 1 and number becomw 1 and bar becomes 50%
        act(() => {option.props.onClick()})
        option = root.findByProps({className: 'opt-1 selected selectall '});
        voteNum = option.findByProps({className: 'voteNumber'});
        bar = option.findByProps({className: 'progress'});
        expect(voteNum.children[0]).toBe('1');
        expect(bar.props.style.width).toBe("50%");

    })
})