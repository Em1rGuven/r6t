package database_test

import (
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"r6t_v2/database"
	"testing"
)

func TestGetProgression(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer func() { _ = db.Close() }()

	const (
		expectedTotal     = 69
		expectedCompleted = 5
	)

	s := &database.ServerDI{DB: db}
	mock.ExpectQuery("SELECT COUNT").WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(expectedTotal))
	mock.ExpectQuery("SELECT COUNT").WithArgs(1).WillReturnRows(sqlmock.NewRows([]string{"count"}).AddRow(expectedCompleted))

	completed, total, err := s.GetProgression(1)
	assert.NoError(t, err)
	assert.Equal(t, expectedCompleted, completed)
	assert.Equal(t, expectedTotal, total)

	if err = mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}
