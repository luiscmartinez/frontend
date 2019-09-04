import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import styled from "styled-components";

import GroupCard from "./GroupCard";

const GroupList = () => {
	const [data, setData] = useState({ groups: [] });

	const [token] = useGetToken();

	useEffect(() => {
		const fetchData = async () => {
			if (token) {
				const groups = await axiosWithAuth([token]).post(`/groups/search`, {
					column: "group_name",
					row: ""
				});
				console.log("DATA", groups.data);
				setData({ groups: groups.data.groupByFilter });
			}
		};

		fetchData();
	}, [token]);

	if (!data.groups) {
		return <div>Loading Groups...</div>;
	}
	//Component should only show top 20 , load more button below. Should be sortable by recent activity/group size/allegiances

	return (
		<SectionContainer>
			<h3>Discover</h3>
			<GroupListContainer>
				{data.groups.map(group => {
					console.log("Group:", group);
					return <GroupCard group={group} key={group.id} />;
				})}
			</GroupListContainer>
		</SectionContainer>
	);
};

const SectionContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const GroupListContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	margin-top: 1vh;
`;

export default GroupList;
