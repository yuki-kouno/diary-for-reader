import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-dialog-choice-book',
  templateUrl: './dialog-choice-book.component.html',
  styleUrls: ['./dialog-choice-book.component.scss']
})
export class DialogChoiceBookComponent implements OnInit {
  alertDialogResult = '';

  constructor(public matDialog: MatDialog) {}

  onDelete(event: string) {
    // ダイアログの表示
    const dialog = this.matDialog.open(DialogChoiceBookComponent, {
      data: { title: '削除確認', message: '削除しても大丈夫ですか？' },
      height: '300px',
      width: '500px',
      disableClose: false
    });

    // ボタンの結果を取得
    dialog.afterClosed().subscribe((result: any) => {
      // 結果をセット
      this.alertDialogResult = result;
    });
  }

  ngOnInit() {}
}
