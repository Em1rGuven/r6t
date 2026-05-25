package main

import (
	"context"
	"database/sql"
	"fmt"
	"r6t_v2/database"
	"r6t_v2/others"
	"r6t_v2/types"

	_ "github.com/mattn/go-sqlite3"
)

type App struct {
	dbDI *database.ServerDI
	ctx  context.Context
}

type Progression struct {
	Learned int `json:"learned"`
	Total   int `json:"total"`
}

func NewApp() *App {
	var (
		db  *sql.DB
		err error
	)
	db, err = sql.Open("sqlite3", "./repeat6times.db?_foreign_keys=on")
	if err != nil {
		panic(err)
	} else if err = db.Ping(); err != nil {
		panic(err)
	}

	fmt.Println("Starting server...")
	return &App{
		dbDI: &database.ServerDI{
			DB: db,
		},
	}
}

func (s *App) ChangeWordCount(num int) error {
	return others.NumberOfWords(num)
}

func (s *App) AddWord(engWord, turWord, path string) error {
	if engWord == "" || turWord == "" {
		return fmt.Errorf("eng or tur word is empty")
	}
	return s.dbDI.AddWord(engWord, turWord, path)
}

func (s *App) AddSample(word, sample string) error {
	if word == "" || sample == "" {
		return fmt.Errorf("word or sample is empty")
	}
	return s.dbDI.AddSample(word, sample)
}

func (s *App) GetWords(userID int) []types.Word {
	if userID < 0 {
		return []types.Word{}
	}
	return s.dbDI.GetWords(userID)
}

func (s *App) UpdateWordStates(userID int, word string, state bool) error {
	if word == "" {
		return fmt.Errorf("invalid input")
	}
	return s.dbDI.UpdateWordStates(userID, word, state)
}

func (s *App) GetProgression(userID int) (Progression, error) {
	if userID < 0 {
		return Progression{}, fmt.Errorf("invalid input")
	}
	learned, total, err := s.dbDI.GetProgression(userID)
	return Progression{Learned: learned, Total: total}, err
}

func (s *App) ForgetPassword(userName, newPassword string) error {
	if userName == "" || newPassword == "" {
		return fmt.Errorf("invalid input")
	}
	return s.dbDI.ForgetPassword(userName, newPassword)
}

func (s *App) UserRegister(username, password string) error {
	if username == "" || password == "" {
		return fmt.Errorf("invalid input")
	}
	return s.dbDI.UserRegister(username, password)
}

func (s *App) UserLogin(username, password string) (bool, error) {
	if username == "" || password == "" {
		return false, fmt.Errorf("geçersiz giriş")
	}

	success, err := s.dbDI.UserLogin(username, password)
	if err != nil {
		return false, err
	} else if !success {
		return false, fmt.Errorf("invalid username or password")
	}
	return true, nil
}

func (s *App) GetUserID(username string) (int, error) {
	return s.dbDI.GetUserID(username)
}

func (s *App) GetRandomWords() ([]string, error) {
	return s.dbDI.GetRandomWords()
}

func (s *App) GetLearnedWords(userID int) ([]string, error) {
	return s.dbDI.GetLearnedWords(userID)
}

func (s *App) Debugging(x interface{}) {
	fmt.Println(x)
}

func (s *App) Startup(ctx context.Context) {
	s.ctx = ctx
}

func (s *App) Shutdown(ctx context.Context) {
	s.ctx = nil
	_ = s.dbDI.DB.Close()
}
