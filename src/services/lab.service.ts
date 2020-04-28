/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: 部门管理服务
 * @LastEditors: Do not Edit
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2020-04-28 19:22:49
 */
import { action } from 'mobx';
import HttpClient from '../utils/HttpClient';
import { BACKEND_URL, messageFail } from './common';
import { Pagination, initalPaginationValue } from '@/interfaces/common';
import { LabModel, LabSearchProps, LabEditModel } from '@/interfaces/lab';

import { LabStore } from '@/stores/lab.store';

export class LabService {
  public store: LabStore;
  private http: HttpClient;

  public constructor() {
    this.http = new HttpClient();
    this.store = new LabStore();
  }

  @action
  public async fetchPageData(searchProps: LabSearchProps): Promise<boolean> {
    this.store.loading = true;
    this.store.pageData = initalPaginationValue;
    try {
      const result = await this.http.postJSON<Pagination<LabModel>>(
        `${BACKEND_URL}/competitionEvent/listByPage`,
        searchProps,
      );
      this.store.loading = false;
      if (result.success) {
        this.store.pageData = result.data;
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      this.store.loading = false;
      messageFail();
      return false;
    }
  }

  @action
  public async update(data: LabEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(
        `${BACKEND_URL}/competitionEvent/updateCompetitionEvent`,
        data,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }

  @action
  public async add(data: LabEditModel): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(
        `${BACKEND_URL}/competitionEvent/addCompetitionEvent`,
        data,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }

  @action
  public async delete(codeList: string[]): Promise<boolean> {
    this.store.loading = true;
    try {
      const result = await this.http.postJSON<string>(
        `${BACKEND_URL}/competitionEvent/deleteCompetitionEvent`,
        codeList,
      );
      this.store.loading = false;
      if (result.success) {
        return true;
      } else {
        messageFail(result.message);
        return false;
      }
    } catch (error) {
      messageFail();
      return false;
    }
  }
}
