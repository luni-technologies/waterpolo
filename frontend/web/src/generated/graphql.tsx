import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Event = {
  __typename?: 'Event';
  eventType: Scalars['String'];
  player: Player;
  score: Scalars['Float'];
  team: Scalars['String'];
  time: Time;
};

export type GoalScorer = {
  __typename?: 'GoalScorer';
  amount: Scalars['Int'];
  name: Scalars['String'];
};

export type League = {
  __typename?: 'League';
  id: Scalars['String'];
  matches: Array<MatchMin>;
  organiser?: Maybe<Scalars['String']>;
  season_end?: Maybe<Scalars['DateTime']>;
  season_start?: Maybe<Scalars['DateTime']>;
  tables: Array<Table>;
  title: Scalars['String'];
};

export type LeagueMid = {
  __typename?: 'LeagueMid';
  id: Scalars['String'];
  matches: Array<MatchMin>;
  title: Scalars['String'];
};

export type LeagueMin = {
  __typename?: 'LeagueMin';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type LeagueResponse = {
  __typename?: 'LeagueResponse';
  mens: Array<LeagueMin>;
  womens: Array<LeagueMin>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  date?: Maybe<Scalars['DateTime']>;
  events: Array<Event>;
  goalscorers_away: Array<GoalScorer>;
  goalscorers_home: Array<GoalScorer>;
  id: Scalars['String'];
  league: Scalars['String'];
  lineup_away: Array<Player>;
  lineup_home: Array<Player>;
  location?: Maybe<Scalars['String']>;
  playerScores: Array<PlayerScore>;
  quarters: Array<QuarterScore>;
  referees: Array<Referee>;
  score_away: Scalars['Int'];
  score_home: Scalars['Int'];
  team_away: Scalars['String'];
  team_home: Scalars['String'];
};

export type MatchMin = {
  __typename?: 'MatchMin';
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  score_away: Scalars['Int'];
  score_home: Scalars['Int'];
  team_away: Scalars['String'];
  team_home: Scalars['String'];
};

export type MatchesOnDate = {
  __typename?: 'MatchesOnDate';
  date: Scalars['DateTime'];
  leagues: Array<LeagueMid>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmDeleteUser: Scalars['Boolean'];
  confirmRegister: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
};


export type MutationConfirmDeleteUserArgs = {
  options: VerifyInput;
};


export type MutationConfirmRegisterArgs = {
  options: VerifyInput;
};


export type MutationDeleteUserArgs = {
  options: LoginInput;
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type Player = {
  __typename?: 'Player';
  isGK: Scalars['Boolean'];
  name: Scalars['String'];
  number: Scalars['Int'];
};

export type PlayerScore = {
  __typename?: 'PlayerScore';
  player: Player;
  score: Scalars['Float'];
};

export type QuarterScore = {
  __typename?: 'QuarterScore';
  score_away: Scalars['Int'];
  score_home: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  all: LeagueResponse;
  findById: League;
  hello: Scalars['String'];
  matchById: Match;
  matchesOnDate: MatchesOnDate;
  me?: Maybe<User>;
  search: SearchResult;
};


export type QueryFindByIdArgs = {
  id: Scalars['String'];
};


export type QueryMatchByIdArgs = {
  id: Scalars['String'];
};


export type QueryMatchesOnDateArgs = {
  date: Scalars['DateTime'];
};


export type QuerySearchArgs = {
  query: Scalars['String'];
};

export type Referee = {
  __typename?: 'Referee';
  name: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  leagues: Array<LeagueMin>;
  players: Array<Scalars['String']>;
  query: Scalars['String'];
};

export type Table = {
  __typename?: 'Table';
  id: Scalars['String'];
  rows: Array<TableRow>;
  title: Scalars['String'];
};

export type TableRow = {
  __typename?: 'TableRow';
  d: Scalars['Int'];
  goal_diff: Scalars['Int'];
  goal_neg: Scalars['Int'];
  goal_pos: Scalars['Int'];
  l: Scalars['Int'];
  played: Scalars['Int'];
  points: Scalars['Int'];
  position: Scalars['Int'];
  team: TeamMin;
  w: Scalars['Int'];
};

export type TeamMin = {
  __typename?: 'TeamMin';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Time = {
  __typename?: 'Time';
  quarter: Scalars['String'];
  seconds: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
};

export type VerifyInput = {
  key: Scalars['String'];
};

export type ConfirmDeleteUserMutationVariables = Exact<{
  options: VerifyInput;
}>;


export type ConfirmDeleteUserMutation = { __typename?: 'Mutation', confirmDeleteUser: boolean };

export type DeleteUserMutationVariables = Exact<{
  options: LoginInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type LeagueAllQueryVariables = Exact<{ [key: string]: never; }>;


export type LeagueAllQuery = { __typename?: 'Query', all: { __typename?: 'LeagueResponse', mens: Array<{ __typename?: 'LeagueMin', id: string, title: string }>, womens: Array<{ __typename?: 'LeagueMin', id: string, title: string }> } };

export type LeagueByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type LeagueByIdQuery = { __typename?: 'Query', findById: { __typename?: 'League', id: string, organiser?: string | null, title: string, season_start?: any | null, season_end?: any | null, matches: Array<{ __typename?: 'MatchMin', id: string, team_home: string, team_away: string, score_home: number, score_away: number, location?: string | null, date?: any | null }>, tables: Array<{ __typename?: 'Table', id: string, title: string, rows: Array<{ __typename?: 'TableRow', position: number, played: number, w: number, d: number, l: number, goal_pos: number, goal_neg: number, goal_diff: number, points: number, team: { __typename?: 'TeamMin', id: string, name: string } }> }> } };

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MatchByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type MatchByIdQuery = { __typename?: 'Query', matchById: { __typename?: 'Match', id: string, team_home: string, team_away: string, score_home: number, score_away: number, location?: string | null, date?: any | null, league: string, quarters: Array<{ __typename?: 'QuarterScore', score_home: number, score_away: number }>, events: Array<{ __typename?: 'Event', team: string, eventType: string, time: { __typename?: 'Time', quarter: string, seconds: number }, player: { __typename?: 'Player', name: string, number: number } }>, referees: Array<{ __typename?: 'Referee', name: string }>, lineup_home: Array<{ __typename?: 'Player', name: string, number: number, isGK: boolean }>, lineup_away: Array<{ __typename?: 'Player', name: string, number: number, isGK: boolean }>, goalscorers_home: Array<{ __typename?: 'GoalScorer', name: string, amount: number }>, goalscorers_away: Array<{ __typename?: 'GoalScorer', name: string, amount: number }>, playerScores: Array<{ __typename?: 'PlayerScore', score: number, player: { __typename?: 'Player', name: string, number: number } }> } };

export type MatchesOnDateQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type MatchesOnDateQuery = { __typename?: 'Query', matchesOnDate: { __typename?: 'MatchesOnDate', date: any, leagues: Array<{ __typename?: 'LeagueMid', id: string, title: string, matches: Array<{ __typename?: 'MatchMin', id: string, date?: any | null, team_home: string, team_away: string, score_home: number, score_away: number, location?: string | null }> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, first_name: string, last_name: string } | null };

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchResult', query: string, players: Array<string>, leagues: Array<{ __typename?: 'LeagueMin', id: string, title: string }> } };

export type ConfirmRegisterMutationVariables = Exact<{
  options: VerifyInput;
}>;


export type ConfirmRegisterMutation = { __typename?: 'Mutation', confirmRegister: boolean };


export const ConfirmDeleteUserDocument = gql`
    mutation ConfirmDeleteUser($options: VerifyInput!) {
  confirmDeleteUser(options: $options)
}
    `;
export type ConfirmDeleteUserMutationFn = Apollo.MutationFunction<ConfirmDeleteUserMutation, ConfirmDeleteUserMutationVariables>;

/**
 * __useConfirmDeleteUserMutation__
 *
 * To run a mutation, you first call `useConfirmDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmDeleteUserMutation, { data, loading, error }] = useConfirmDeleteUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useConfirmDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmDeleteUserMutation, ConfirmDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmDeleteUserMutation, ConfirmDeleteUserMutationVariables>(ConfirmDeleteUserDocument, options);
      }
export type ConfirmDeleteUserMutationHookResult = ReturnType<typeof useConfirmDeleteUserMutation>;
export type ConfirmDeleteUserMutationResult = Apollo.MutationResult<ConfirmDeleteUserMutation>;
export type ConfirmDeleteUserMutationOptions = Apollo.BaseMutationOptions<ConfirmDeleteUserMutation, ConfirmDeleteUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($options: LoginInput!) {
  deleteUser(options: $options)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LeagueAllDocument = gql`
    query LeagueAll {
  all {
    mens {
      id
      title
    }
    womens {
      id
      title
    }
  }
}
    `;

/**
 * __useLeagueAllQuery__
 *
 * To run a query within a React component, call `useLeagueAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeagueAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeagueAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useLeagueAllQuery(baseOptions?: Apollo.QueryHookOptions<LeagueAllQuery, LeagueAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeagueAllQuery, LeagueAllQueryVariables>(LeagueAllDocument, options);
      }
export function useLeagueAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeagueAllQuery, LeagueAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeagueAllQuery, LeagueAllQueryVariables>(LeagueAllDocument, options);
        }
export type LeagueAllQueryHookResult = ReturnType<typeof useLeagueAllQuery>;
export type LeagueAllLazyQueryHookResult = ReturnType<typeof useLeagueAllLazyQuery>;
export type LeagueAllQueryResult = Apollo.QueryResult<LeagueAllQuery, LeagueAllQueryVariables>;
export const LeagueByIdDocument = gql`
    query LeagueById($id: String!) {
  findById(id: $id) {
    id
    organiser
    title
    season_start
    season_end
    matches {
      id
      team_home
      team_away
      score_home
      score_away
      location
      date
    }
    tables {
      id
      title
      rows {
        position
        team {
          id
          name
        }
        played
        w
        d
        l
        goal_pos
        goal_neg
        goal_diff
        points
      }
    }
  }
}
    `;

/**
 * __useLeagueByIdQuery__
 *
 * To run a query within a React component, call `useLeagueByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeagueByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeagueByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeagueByIdQuery(baseOptions: Apollo.QueryHookOptions<LeagueByIdQuery, LeagueByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LeagueByIdQuery, LeagueByIdQueryVariables>(LeagueByIdDocument, options);
      }
export function useLeagueByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LeagueByIdQuery, LeagueByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LeagueByIdQuery, LeagueByIdQueryVariables>(LeagueByIdDocument, options);
        }
export type LeagueByIdQueryHookResult = ReturnType<typeof useLeagueByIdQuery>;
export type LeagueByIdLazyQueryHookResult = ReturnType<typeof useLeagueByIdLazyQuery>;
export type LeagueByIdQueryResult = Apollo.QueryResult<LeagueByIdQuery, LeagueByIdQueryVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MatchByIdDocument = gql`
    query MatchById($id: String!) {
  matchById(id: $id) {
    id
    team_home
    team_away
    score_home
    score_away
    location
    date
    quarters {
      score_home
      score_away
    }
    events {
      time {
        quarter
        seconds
      }
      team
      player {
        name
        number
      }
      eventType
    }
    referees {
      name
    }
    league
    lineup_home {
      name
      number
      isGK
    }
    lineup_away {
      name
      number
      isGK
    }
    goalscorers_home {
      name
      amount
    }
    goalscorers_away {
      name
      amount
    }
    playerScores {
      player {
        name
        number
      }
      score
    }
  }
}
    `;

/**
 * __useMatchByIdQuery__
 *
 * To run a query within a React component, call `useMatchByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMatchByIdQuery(baseOptions: Apollo.QueryHookOptions<MatchByIdQuery, MatchByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchByIdQuery, MatchByIdQueryVariables>(MatchByIdDocument, options);
      }
export function useMatchByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchByIdQuery, MatchByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchByIdQuery, MatchByIdQueryVariables>(MatchByIdDocument, options);
        }
export type MatchByIdQueryHookResult = ReturnType<typeof useMatchByIdQuery>;
export type MatchByIdLazyQueryHookResult = ReturnType<typeof useMatchByIdLazyQuery>;
export type MatchByIdQueryResult = Apollo.QueryResult<MatchByIdQuery, MatchByIdQueryVariables>;
export const MatchesOnDateDocument = gql`
    query MatchesOnDate($date: DateTime!) {
  matchesOnDate(date: $date) {
    date
    leagues {
      id
      title
      matches {
        id
        date
        team_home
        team_away
        score_home
        score_away
        location
      }
    }
  }
}
    `;

/**
 * __useMatchesOnDateQuery__
 *
 * To run a query within a React component, call `useMatchesOnDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useMatchesOnDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchesOnDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useMatchesOnDateQuery(baseOptions: Apollo.QueryHookOptions<MatchesOnDateQuery, MatchesOnDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MatchesOnDateQuery, MatchesOnDateQueryVariables>(MatchesOnDateDocument, options);
      }
export function useMatchesOnDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MatchesOnDateQuery, MatchesOnDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MatchesOnDateQuery, MatchesOnDateQueryVariables>(MatchesOnDateDocument, options);
        }
export type MatchesOnDateQueryHookResult = ReturnType<typeof useMatchesOnDateQuery>;
export type MatchesOnDateLazyQueryHookResult = ReturnType<typeof useMatchesOnDateLazyQuery>;
export type MatchesOnDateQueryResult = Apollo.QueryResult<MatchesOnDateQuery, MatchesOnDateQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    email
    first_name
    last_name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchDocument = gql`
    query Search($query: String!) {
  search(query: $query) {
    query
    leagues {
      id
      title
    }
    players
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const ConfirmRegisterDocument = gql`
    mutation ConfirmRegister($options: VerifyInput!) {
  confirmRegister(options: $options)
}
    `;
export type ConfirmRegisterMutationFn = Apollo.MutationFunction<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>;

/**
 * __useConfirmRegisterMutation__
 *
 * To run a mutation, you first call `useConfirmRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmRegisterMutation, { data, loading, error }] = useConfirmRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useConfirmRegisterMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>(ConfirmRegisterDocument, options);
      }
export type ConfirmRegisterMutationHookResult = ReturnType<typeof useConfirmRegisterMutation>;
export type ConfirmRegisterMutationResult = Apollo.MutationResult<ConfirmRegisterMutation>;
export type ConfirmRegisterMutationOptions = Apollo.BaseMutationOptions<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>;