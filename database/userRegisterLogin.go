package database

import (
	"database/sql"
	"golang.org/x/crypto/bcrypt"

	_ "github.com/mattn/go-sqlite3"
)

type ServerDI struct {
	DB *sql.DB
}

func (s *ServerDI) UserRegister(username, password string) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = s.DB.Exec("INSERT INTO users(userName, passwordHash) VALUES (?, ?)", username, passwordHash)
	return err
}

func (s *ServerDI) UserLogin(username, password string) (bool, error) {
	var hashedPassword string
	err := s.DB.QueryRow("SELECT passwordHash FROM users WHERE userName = ?", username).Scan(&hashedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil, nil
}

func (s *ServerDI) ForgetPassword(userName, newPassword string) error {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(newPassword), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	_, err = s.DB.Exec("UPDATE users SET passwordHash = ? WHERE userName = ?", passwordHash, userName)
	return err
}
