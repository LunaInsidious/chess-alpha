package handler

import (
	"chess-alpha/server/domain/entconst"
	log "chess-alpha/server/log"
	"fmt"
	"reflect"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func BindRequest[T any](c echo.Context) (*T, error) {
	req := new(T)
	logger, _ := log.NewLogger()

	if err := c.Bind(req); err != nil {
		// logger.Errorを呼び出すことでalertが発生する
		// bind errorはフロントエンド側の実装ミス or バックエンド側のスキーマの定義ミスにより発生する可能性が高いため、
		// 保守対応の修正が必要のはずである。そのため、通知を行うためErrorを使用する。
		logger.Error("Failed to bind request body", zap.Error(err))
		// errorは最終的にmiddleware/error_middleware.goのHandleErrorで処理される
		// bindの失敗はvalidation errorとして扱うことで、errorのステータスをbad requestとなる
		// ※bindの失敗は、基本的にstringであるべきところにintがくる、などの例が基本的なので、validation errorは適切である
		return nil, entconst.NewValidationError(fmt.Errorf("failed to bind request body :%w", err))
	}

	// パスパラメータについては必須チェックを行う
	reqType := reflect.TypeOf(*req)
	reqValue := reflect.ValueOf(*req)
	for i := 0; i < reqType.NumField(); i++ {
		// パスパラメータが空文字の場合、バインドできなかったとみなしてエラーにする
		if reqType.Field(i).Tag.Get("param") != "" && reqValue.Field(i).String() == "" {
			return nil, entconst.NewValidationErrorFromMsg("failed to bind path param id.")
		}
	}

	return req, nil
}
