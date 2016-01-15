/**
 * 后端返回错误时，抛出错误
 */
export function eitherError(res: Response) {
		if(res.error) throw new Error(error);
		return '';
}

/**
 * 返回 true
 */
export function truth() {
		return true;
}
