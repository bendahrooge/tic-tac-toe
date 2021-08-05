import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { PLAYERS, DEFAULT_BOARD } from "./constants";

export default function Game(props: any) {
  const [turn, setTurn] = useState(PLAYERS.PLAYER1);
  const [winner, setWinner] = useState(PLAYERS.NONE);

  const [board, setBoard] = useState(DEFAULT_BOARD());

  const onMove = (row: number, col: number) => {
    // Check if already a winner has been determined
    if (winner != PLAYERS.NONE) {
      return;
    }

    // Check if cell is occupied
    if (board[row][col] === PLAYERS.NONE) {
      let b = board;

      // Assign the player to the tile they moved into
      b[row][col] = turn;

      setBoard(b);

      // Flip turn

      if (turn === PLAYERS.PLAYER1) {
        setTurn(PLAYERS.PLAYER2);
      } else {
        setTurn(PLAYERS.PLAYER1);
      }
    } else {
      alert("Cell is occupied");
    }

    /**
     * Check if winner
     */

    // Horizontal
    for (let y = 0; y < 3; y++) {
      if (
        board[y][0] != PLAYERS.NONE &&
        board[y][0] === board[y][1] &&
        board[y][0] === board[y][2]
      ) {
        setWinner(board[y][0]);
      }
    }

    // Vertical
    for (let x = 0; x < 3; x++) {
      if (
        board[0][x] != PLAYERS.NONE &&
        board[0][x] === board[1][x] &&
        board[0][x] === board[2][x]
      ) {
        setWinner(board[0][x]);
      }
    }

    // Diagonal 1
    if (
      board[0][0] != PLAYERS.NONE &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
    }

    // Diagonal 2
    if (
      board[0][2] != PLAYERS.NONE &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
    }

    // Check if tie
    let movedTiles = 0;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[x][y] != PLAYERS.NONE) {
          movedTiles++;
        }
      }
    }

    if (movedTiles === 9) {
      setWinner(PLAYERS.TIE);
    }
  };

  const Cell = (props: any) => {
    return (
      <Pressable onPress={() => onMove(props.y, props.x)}>
        <View style={styles.item}>
          <Text style={styles.label}>
            {props.player === PLAYERS.PLAYER1 && "X"}
            {props.player === PLAYERS.PLAYER2 && "O"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 50 }}>
            {winner === PLAYERS.NONE && (
              <>
                {turn === PLAYERS.PLAYER1
                  ? "Player X's turn"
                  : "Player O's turn"}
              </>
            )}
            {winner === PLAYERS.PLAYER1 && "Player X won!"}
            {winner === PLAYERS.PLAYER2 && "Player O won!"}
            {winner === PLAYERS.TIE && "Tie"}
          </Text>
        </View>
        <View style={styles.row}>
          <Cell player={board[0][0]} x={0} y={0} />
          <Cell player={board[0][1]} x={1} y={0} />
          <Cell player={board[0][2]} x={2} y={0} />
        </View>
        <View style={styles.row}>
          <Cell player={board[1][0]} x={0} y={1} />
          <Cell player={board[1][1]} x={1} y={1} />
          <Cell player={board[1][2]} x={2} y={1} />
        </View>
        <View style={styles.row}>
          <Cell player={board[2][0]} x={0} y={2} />
          <Cell player={board[2][1]} x={1} y={2} />
          <Cell player={board[2][2]} x={2} y={2} />
        </View>
        {winner != PLAYERS.NONE && (
          <View style={styles.row}>
            <Pressable
              style={styles.btn}
              onPress={() => {
                setBoard(DEFAULT_BOARD());
                setWinner(PLAYERS.NONE);
              }}
            >
              <Text style={styles.text}>Play again?</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
  },
  item: {
    minHeight: 100,
    minWidth: 100,
    backgroundColor: "#ddd",
    margin: 10,
  },
  label: {
    textAlign: "center",
    fontSize: 80,
  },
  btn: {
    padding: 20,
    marginTop: 20,
    width: 225,
    borderRadius: 10,
    backgroundColor: "dodgerblue",
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
});
